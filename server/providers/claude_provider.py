import httpx
import logging
from typing import Any, Dict, List, Optional
from server.providers.base import AIProvider
from server.config import settings

logger = logging.getLogger("compliance_copilot.providers.claude")

class ClaudeProvider(AIProvider):
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.ANTHROPIC_API_KEY
        self.model = "claude-3-5-sonnet-20241022"

    async def complete(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        if not self.api_key:
            logger.warning("Claude API key unconfigured. Returning mock response.")
            return {
                "text": "Claude 3.5 Sonnet response (unconfigured API key).",
                "prompt_tokens": 150,
                "completion_tokens": 90,
                "total_tokens": 240,
                "estimated_cost_usd": 0.0015
            }

        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }

        payload = {
            "model": self.model,
            "max_tokens": 2048,
            "messages": [{"role": "user", "content": prompt}]
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
            cost = (input_tokens * 0.000003) + (output_tokens * 0.000015)

            return {
                "text": text,
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": input_tokens + output_tokens,
                "estimated_cost_usd": round(cost, 6)
            }

    async def generate_embedding(self, text: str) -> List[float]:
        import hashlib
        h = hashlib.sha256(text.encode('utf-8')).hexdigest()
        return [((int(h[(i % 64)], 16) / 16.0) - 0.5) for i in range(1536)]
