from fastapi import APIRouter
from pydantic import BaseModel
from server.agents.rag.retriever import RAGService

router = APIRouter()
rag_service = RAGService()

class RAGQueryRequest(BaseModel):
    query: str
    contract_id: str = "CTR-2026-0891"
    contract_title: str = "Enterprise Manufacturing Supply & Cloud MSA"

@router.post("/rag/query")
async def rag_query_endpoint(req: RAGQueryRequest):
    return await rag_service.query_legal_assistant(
        query=req.query,
        contract_title=req.contract_title
    )
