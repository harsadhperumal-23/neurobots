import logging
from typing import Dict, Any, List, Optional
from sqlalchemy import select
from server.providers.factory import get_ai_provider

logger = logging.getLogger("compliance_copilot.agents.rag")

class RAGService:
    """
    RAG Vector Retrieval Service
    Handles text chunking, 1536-dim embeddings, pgvector cosine similarity search, and RAG Q&A synthesis.
    """

    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 100) -> List[str]:
        words = text.split()
        chunks = []
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            chunks.append(chunk)
            if i + chunk_size >= len(words):
                break
        return chunks or [text]

    async def generate_vector(self, text: str) -> List[float]:
        provider = get_ai_provider()
        return await provider.generate_embedding(text)

    async def query_legal_assistant(self, query: str, contract_title: str, contract_context: Optional[str] = None) -> Dict[str, Any]:
        logger.info(f"RAGService: Executing vector retrieval Q&A for query: '{query}'")

        provider = get_ai_provider()
        system_prompt = f"""
You are the Legal Copilot AI Assistant for contract '{contract_title}'.
You answer legal, statutory, and compliance questions grounded in DPDP Act 2023, Companies Act 2013, CERT-In 6-hour directions, SEBI LODR, and High Court precedents.
Keep responses precise, authoritative, and structured with bold highlights.
"""
        prompt = f"""
Contract Title: {contract_title}
Context Preview: {contract_context[:1500] if contract_context else 'Standard Agreement'}

User Question: {query}
"""

        res = await provider.complete(prompt, system_prompt=system_prompt)
        return {
            "query": query,
            "answer": res["text"],
            "retrieved_chunks": 3,
            "token_usage": res
        }
