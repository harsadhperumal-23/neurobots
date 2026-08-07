import httpx
import json
import logging
from typing import Any, Dict, List, Optional
from server.providers.base import AIProvider
from server.config import settings

logger = logging.getLogger("compliance_copilot.providers.openai")

class OpenAIProvider(AIProvider):
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model = model or settings.OPENAI_MODEL

    async def complete(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        if not self.api_key:
            logger.warning("OpenAI API key unconfigured. Returning mock enterprise response.")
            return {
                "text": "OpenAI completion response (unconfigured API key).",
                "prompt_tokens": 120,
                "completion_tokens": 80,
                "total_tokens": 200,
                "estimated_cost_usd": 0.001
            }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.2
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

            return {
                "text": choice,
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": total_tokens,
                "estimated_cost_usd": round(cost, 6)
            }

    async def generate_embedding(self, text: str) -> List[float]:
        if not self.api_key:
            # Fallback 1536-dim vector generator
            import hashlib
            h = hashlib.sha256(text.encode('utf-8')).hexdigest()
            # deterministic 1536 float values
            return [((int(h[(i % 64)], 16) / 16.0) - 0.5) for i in range(1536)]

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
