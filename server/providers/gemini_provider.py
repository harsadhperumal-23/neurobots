import time
import httpx
import logging
import hashlib
from typing import Any, Dict, List, Optional
from providers.base import AIProvider, ProviderNotConfiguredException
from config import settings

logger = logging.getLogger("compliance_copilot.providers.gemini")

class GeminiProvider(AIProvider):
    provider_name: str = "Gemini"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        if not self.api_key:
            raise ProviderNotConfiguredException("GEMINI_API_KEY is not configured.")
        self.model_name = model or settings.LLM_MODEL or "gemini-flash-latest"

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        messages = [{"role": "user", "content": prompt}]
        return await self.chat(messages, system_prompt=system_prompt, json_mode=json_mode)

    async def chat(self, messages: List[Dict[str, str]], system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        t0 = time.time()
        
        # Candidate model names to try in case of 404 or 429
        models_to_try = [self.model_name, "gemini-flash-latest", "gemini-3.5-flash"]
        # Deduplicate preserving order
        unique_models = []
        for m in models_to_try:
            if m and m not in unique_models:
                unique_models.append(m)

        contents = []
        if system_prompt:
            contents.append({"role": "user", "parts": [{"text": f"System Guidelines:\n{system_prompt}"}]})
            contents.append({"role": "model", "parts": [{"text": "Understood. I will strictly follow these legal compliance guidelines."}]})

        for msg in messages:
            role = "user" if msg.get("role") == "user" else "model"
            contents.append({"role": role, "parts": [{"text": msg.get("content", "")}]})

        payload = {"contents": contents}
        if json_mode:
            payload["generationConfig"] = {"responseMimeType": "application/json"}

        last_exception = None
        for current_model in unique_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{current_model}:generateContent?key={self.api_key}"
            logger.info(f"Attempting Gemini API call with model: '{current_model}'")

            async with httpx.AsyncClient(timeout=60.0) as client:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        text = candidates[0]["content"]["parts"][0]["text"]
                        usage = data.get("usageMetadata", {})
                        prompt_tokens = usage.get("promptTokenCount", self.count_tokens(str(contents)))
                        completion_tokens = usage.get("candidatesTokenCount", self.count_tokens(text))
                        total_tokens = usage.get("totalTokenCount", prompt_tokens + completion_tokens)
                        cost = (prompt_tokens * 0.00000035) + (completion_tokens * 0.00000105)
                        latency_ms = int((time.time() - t0) * 1000)

                        logger.info(f"Gemini Call Successful | Model: {current_model} | Tokens: {total_tokens} | Latency: {latency_ms}ms | Cost: ${cost:.6f}")

                        return {
                            "text": text,
                            "provider": self.provider_name,
                            "model": current_model,
                            "prompt_tokens": prompt_tokens,
                            "completion_tokens": completion_tokens,
                            "total_tokens": total_tokens,
                            "estimated_cost_usd": round(cost, 6),
                            "latency_ms": latency_ms
                        }
                else:
                    last_exception = httpx.HTTPStatusError(
                        f"HTTP {resp.status_code}: {resp.text}",
                        request=resp.request,
                        response=resp
                    )
                    logger.warning(f"Gemini model '{current_model}' failed with status {resp.status_code}. Trying next fallback...")

        if last_exception:
            raise last_exception
        raise RuntimeError("Failed to obtain response from Gemini API models.")

    async def embeddings(self, text: str) -> List[float]:
        h = hashlib.sha256(text.encode('utf-8')).hexdigest()
        return [((int(h[(i % 64)], 16) / 16.0) - 0.5) for i in range(1536)]

    def count_tokens(self, text: str) -> int:
        return max(1, len(text.split()) * 4 // 3)
