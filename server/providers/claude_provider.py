import time
import httpx
import logging
import hashlib
from typing import Any, Dict, List, Optional
from providers.base import AIProvider, ProviderNotConfiguredException
from config import settings

logger = logging.getLogger("compliance_copilot.providers.claude")

class ClaudeProvider(AIProvider):
    provider_name: str = "Claude"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.ANTHROPIC_API_KEY
        if not self.api_key:
            raise ProviderNotConfiguredException("ANTHROPIC_API_KEY is not configured.")
        self.model_name = model or settings.LLM_MODEL or "claude-3-5-sonnet-20241022"

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        messages = [{"role": "user", "content": prompt}]
        return await self.chat(messages, system_prompt=system_prompt, json_mode=json_mode)

    async def chat(self, messages: List[Dict[str, str]], system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        t0 = time.time()
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }

        payload = {
            "model": self.model_name,
            "max_tokens": settings.MAX_TOKENS,
            "messages": messages
        }
        if system_prompt:
            payload["system"] = system_prompt

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()

            text = data["content"][0]["text"]
            usage = data.get("usage", {})
            input_tokens = usage.get("input_tokens", 0)
            output_tokens = usage.get("output_tokens", 0)
            total_tokens = input_tokens + output_tokens
            cost = (input_tokens * 0.000003) + (output_tokens * 0.000015)
            latency_ms = int((time.time() - t0) * 1000)

            logger.info(f"Claude Call Successful | Model: {self.model_name} | Tokens: {total_tokens} | Latency: {latency_ms}ms | Cost: ${cost:.6f}")

            return {
                "text": text,
                "provider": self.provider_name,
                "model": self.model_name,
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": total_tokens,
                "estimated_cost_usd": round(cost, 6),
                "latency_ms": latency_ms
            }

    async def embeddings(self, text: str) -> List[float]:
        h = hashlib.sha256(text.encode('utf-8')).hexdigest()
        return [((int(h[(i % 64)], 16) / 16.0) - 0.5) for i in range(1536)]

    def count_tokens(self, text: str) -> int:
        return max(1, len(text.split()) * 4 // 3)
