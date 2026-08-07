from server.providers.base import AIProvider
from server.providers.openai_provider import OpenAIProvider
from server.providers.claude_provider import ClaudeProvider
from server.providers.gemini_provider import GeminiProvider
from server.config import settings

def get_ai_provider(provider_name: str = None) -> AIProvider:
    name = (provider_name or settings.DEFAULT_AI_PROVIDER).lower()
    if name == "claude" or name == "anthropic":
        return ClaudeProvider()
    elif name == "gemini":
        return GeminiProvider()
    else:
        return OpenAIProvider()
