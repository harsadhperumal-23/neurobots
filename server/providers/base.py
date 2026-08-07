from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

class AIProvider(ABC):

    @abstractmethod
    async def complete(self, prompt: str, system_prompt: Optional[str] = None, json_mode: bool = False) -> Dict[str, Any]:
        """
        Executes a completion call returning a dict:
        {
          "text": str,
          "prompt_tokens": int,
          "completion_tokens": int,
          "total_tokens": int,
          "estimated_cost_usd": float
        }
        """
        pass

    @abstractmethod
    async def generate_embedding(self, text: str) -> List[float]:
        """
        Generates 1536-dimensional vector embedding for pgvector storage.
        """
        pass
