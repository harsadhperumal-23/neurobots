from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, AsyncGenerator

class ProviderNotConfiguredException(Exception):
    """Raised when no AI Provider API keys are configured."""
    pass

class AIProvider(ABC):
    provider_name: str = "base"
    model_name: str = "base-model"

    @abstractmethod
    async def generate(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        """
        Executes a completion call returning dict:
        {
          "text": str,
          "provider": str,
          "model": str,
          "prompt_tokens": int,
          "completion_tokens": int,
          "total_tokens": int,
          "estimated_cost_usd": float,
          "latency_ms": int
        }
        """
        pass

    @abstractmethod
    async def chat(self, messages: List[Dict[str, str]], system_prompt: Optional[str] = None) -> Dict[str, Any]:
        """
        Executes a multi-turn chat call.
        """
        pass

    @abstractmethod
    async def embeddings(self, text: str) -> List[float]:
        """
        Generates 1536-dimensional vector embedding for pgvector storage.
        """
        pass

    @abstractmethod
    def count_tokens(self, text: str) -> int:
        """
        Estimates token count for text input.
        """
        pass

    async def complete(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        return await self.generate(prompt, system_prompt=system_prompt, json_mode=json_mode)

    async def generate_embedding(self, text: str) -> List[float]:
        return await self.embeddings(text)
