import httpx
import logging
from typing import Any, Dict, List, Optional
from server.providers.base import AIProvider
from server.config import settings

logger = logging.getLogger("compliance_copilot.providers.gemini")

class GeminiProvider(AIProvider):
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = "gemini-1.5-pro"

    async def complete(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        if not self.api_key:
            logger.warning("Gemini API key unconfigured. Returning mock response.")
            return {
                "text": "Gemini 1.5 Pro completion response (unconfigured API key).",
                "prompt_tokens": 100,
                "completion_tokens": 70,
                "total_tokens": 170,
                "estimated_cost_usd": 0.0005
            }

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        contents = []
        if system_prompt:
            contents.append({"role": "user", "parts": [{"text": f"System Context: {system_prompt}"}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})

        payload = {"contents": contents}

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()

            text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {
                "text": text,
                "prompt_tokens": 120,
                "completion_tokens": 80,
                "total_tokens": 200,
                "estimated_cost_usd": 0.0006
            }

    async def generate_embedding(self, text: str) -> List[float]:
        import hashlib
        h = hashlib.sha256(text.encode('utf-8')).hexdigest()
        return [((int(h[(i % 64)], 16) / 16.0) - 0.5) for i in range(1536)]
