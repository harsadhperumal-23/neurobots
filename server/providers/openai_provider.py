import time
import httpx
import logging
from typing import Any, Dict, List, Optional
from providers.base import AIProvider, ProviderNotConfiguredException
from config import settings

logger = logging.getLogger("compliance_copilot.providers.openai")

class OpenAIProvider(AIProvider):
    provider_name: str = "OpenAI"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.OPENAI_API_KEY
        if not self.api_key:
            raise ProviderNotConfiguredException("OPENAI_API_KEY is not configured.")
        self.model_name = model or settings.LLM_MODEL or "gpt-4o"

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        return await self.chat(messages, system_prompt=None, json_mode=json_mode)

    async def chat(self, messages: List[Dict[str, str]], system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        t0 = time.time()
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        full_messages = []
        if system_prompt:
            full_messages.append({"role": "system", "content": system_prompt})
        full_messages.extend(messages)

        payload = {
            "model": self.model_name,
            "messages": full_messages,
            "temperature": settings.TEMPERATURE,
            "max_tokens": settings.MAX_TOKENS
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()

            choice = data["choices"][0]["message"]["content"]
            usage = data.get("usage", {})
            prompt_tokens = usage.get("prompt_tokens", 0)
            completion_tokens = usage.get("completion_tokens", 0)
            total_tokens = usage.get("total_tokens", 0)
            cost = (prompt_tokens * 0.000005) + (completion_tokens * 0.000015)
            latency_ms = int((time.time() - t0) * 1000)

            logger.info(f"OpenAI Call Successful | Model: {self.model_name} | Tokens: {total_tokens} | Latency: {latency_ms}ms | Cost: ${cost:.6f}")

            return {
                "text": choice,
                "provider": self.provider_name,
                "model": self.model_name,
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": total_tokens,
                "estimated_cost_usd": round(cost, 6),
                "latency_ms": latency_ms
            }

    async def embeddings(self, text: str) -> List[float]:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "text-embedding-3-small",
            "input": text
        }
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post("https://api.openai.com/v1/embeddings", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["data"][0]["embedding"]

    def count_tokens(self, text: str) -> int:
        return max(1, len(text.split()) * 4 // 3)
