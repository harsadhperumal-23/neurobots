import traceback
import httpx
import logging
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional
from agents.rag.retriever import RAGService
from providers.base import ProviderNotConfiguredException
from config import settings

logger = logging.getLogger("compliance_copilot.api.rag")

router = APIRouter()
rag_service = RAGService()

class RAGQueryRequest(BaseModel):
    question: Optional[str] = Field(default=None, alias="query")
    query: Optional[str] = None
    contract_id: Optional[str] = "CTR-2026-0891"
    contract_title: Optional[str] = "Enterprise Manufacturing Supply & Cloud MSA"

    def get_prompt_text(self) -> str:
        return self.question or self.query or "Summarize DPDP 2023 compliance risks"

@router.post("/rag/query")
async def rag_query_endpoint(req: RAGQueryRequest):
    prompt_text = req.get_prompt_text()
    key_found = "FOUND" if (settings.GEMINI_API_KEY or settings.OPENAI_API_KEY or settings.ANTHROPIC_API_KEY) else "MISSING"

    logger.info(f"\n========================\nRAG REQUEST\n========================\nQuestion:\n{prompt_text}\n\nAPI Key:\n{key_found}\n========================")

    try:
        res = await rag_service.query_legal_assistant(
            question=prompt_text,
            contract_title=req.contract_title or "Enterprise MSA"
        )

        logger.info(f"\n========================\nRAG RESPONSE SUCCESS\n========================\nProvider:\n{res.get('provider')}\n\nModel:\n{res.get('model')}\n\nPrompt Tokens:\n{res.get('tokens')}\n\nLatency:\n{res.get('latency_ms')}ms\n\nResponse:\n{res.get('answer')[:200]}...\n========================")

        return res

    except ProviderNotConfiguredException as e:
        tb = traceback.format_exc()
        logger.error(f"\n========================\nRAG REQUEST FAILED\n========================\nError:\n{str(e)}\n\nTraceback:\n{tb}\n========================")
        return {
            "success": False,
            "provider": "None",
            "error": "No AI provider configured",
            "details": str(e),
            "trace": tb
        }
    except httpx.HTTPStatusError as e:
        tb = traceback.format_exc()
        code = e.response.status_code
        logger.error(f"\n========================\nRAG REQUEST HTTP ERROR ({code})\n========================\nError:\n{str(e)}\n\nTraceback:\n{tb}\n========================")
        return {
            "success": False,
            "provider": settings.DEFAULT_AI_PROVIDER,
            "error": f"HTTP {code} from AI Provider",
            "details": e.response.text,
            "trace": tb
        }
    except Exception as e:
        tb = traceback.format_exc()
        logger.error(f"\n========================\nRAG UNEXPECTED ERROR\n========================\nError:\n{str(e)}\n\nTraceback:\n{tb}\n========================")
        return {
            "success": False,
            "provider": settings.DEFAULT_AI_PROVIDER,
            "error": str(e),
            "details": "Unexpected model synthesis error",
            "trace": tb
        }
