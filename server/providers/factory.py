import logging
from providers.base import AIProvider, ProviderNotConfiguredException
from providers.openai_provider import OpenAIProvider
from providers.claude_provider import ClaudeProvider
from providers.gemini_provider import GeminiProvider
from config import settings

logger = logging.getLogger("compliance_copilot.providers.factory")

def get_ai_provider(provider_name: str = None) -> AIProvider:
    name = (provider_name or settings.DEFAULT_AI_PROVIDER).lower()

    if name == "gemini":
        if settings.GEMINI_API_KEY:
            return GeminiProvider()
        raise ProviderNotConfiguredException("GEMINI_API_KEY is not configured in environment.")

    elif name == "openai":
        if settings.OPENAI_API_KEY:
            return OpenAIProvider()
        raise ProviderNotConfiguredException("OPENAI_API_KEY is not configured in environment.")

    elif name == "claude" or name == "anthropic":
        if settings.ANTHROPIC_API_KEY:
            return ClaudeProvider()
        raise ProviderNotConfiguredException("ANTHROPIC_API_KEY is not configured in environment.")

    # AUTO-SELECTION PRIORITY: GEMINI -> OPENAI -> CLAUDE
    if settings.GEMINI_API_KEY:
        logger.info("Auto-selecting Gemini AI Provider")
        return GeminiProvider()
    elif settings.OPENAI_API_KEY:
        logger.info("Auto-selecting OpenAI Provider")
        return OpenAIProvider()
    elif settings.ANTHROPIC_API_KEY:
        logger.info("Auto-selecting Claude AI Provider")
        return ClaudeProvider()
    else:
        logger.error("No valid AI provider API key found in environment variables.")
        raise ProviderNotConfiguredException("No AI provider API key configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY.")
