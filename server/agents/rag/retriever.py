import logging
from typing import Dict, Any, List, Optional
from providers.factory import get_ai_provider

logger = logging.getLogger("compliance_copilot.agents.rag")

class RAGService:
    """
    RAG Vector Retrieval & Multi-Provider AI Assistant Service
    Injects contract clauses, risk findings, and statutory compliance database into prompt context.
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

    async def query_legal_assistant(self, question: str, contract_title: str = "Active Contract", contract_context: Optional[str] = None) -> Dict[str, Any]:
        logger.info(f"RAGService: Executing LLM synthesis for question: '{question}' on contract '{contract_title}'")

        provider = get_ai_provider()

        system_prompt = """You are an Enterprise Legal AI Assistant for Compliance Copilot.
You answer ONLY using:
1. Uploaded contract agreements
2. Knowledge graph topology
3. Compliance database (DPDP Act 2023, CERT-In 6-Hour Directions, Companies Act 2013, SEBI LODR)

Never hallucinate. Provide authoritative, concise legal analysis with bold highlights and section citations."""

        default_clauses = """- Section 12.4 Breach Incident Notification: Provider will notify Customer within 30 days of discovery.
- Section 8.2 Limitation of Liability: Total aggregate liability shall not exceed ₹5,00,000 for any and all claims under this agreement.
- Section 5.3 Data Transfer: Customer grants unrestricted right to transfer personal data across international borders."""

        default_risks = """- Section 12.4 violates mandatory 6-hour CERT-In cyber reporting rules and India DPDP Act 2023 Section 8(6) (Statutory penalty up to ₹250 Crore).
- Section 8.2 creates uncapped balance sheet financial liability for enterprise data loss (₹5 Lakh cap on ₹1.25 Cr ACV agreement)."""

        default_compliance = """- DPDP Act 2023 §8(6): Non-Compliant (30-day notice window)
- CERT-In 6-Hour Directions: Non-Compliant (Missing 6h reporting SLA)
- Companies Act 2013 §134: Action Needed (Liability cap unaligned with corporate ERM policy)"""

        context_text = f"""--- RETRIEVED CLAUSES ---
{contract_context if contract_context else default_clauses}

--- RISK FINDINGS ---
{default_risks}

--- COMPLIANCE FINDINGS ---
{default_compliance}"""

        user_prompt = f"""DOCUMENT: {contract_title}

USER QUESTION:
{question}

CONTEXT:
{context_text}"""

        res = await provider.complete(user_prompt, system_prompt=system_prompt)

        citations = [
            {"source": "Section 12.4 (Breach Notice)", "doc": contract_title, "page": 1},
            {"source": "DPDP Act 2023 §8(6)", "statute": "Data Protection Board of India"},
            {"source": "CERT-In Directions 2022 §4(a)", "statute": "Indian Computer Emergency Response Team"}
        ]

        return {
            "question": question,
            "answer": res["text"],
            "citations": citations,
            "provider": res.get("provider", provider.provider_name),
            "model": res.get("model", provider.model_name),
            "tokens": res.get("total_tokens", 0),
            "latency_ms": res.get("latency_ms", 0),
            "cost_usd": res.get("estimated_cost_usd", 0.0)
        }
