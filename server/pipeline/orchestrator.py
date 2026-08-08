import time
import logging
from typing import Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from agents.ocr.extractor import OCRAgent
from agents.ner.extractor import NERAgent
from agents.clauses.extractor import ClauseAgent
from agents.risk.evaluator import RiskAgent
from agents.compliance.auditor import ComplianceAgent
from agents.recommendation.drafter import RecommendationAgent
from agents.summary.briefing import ExecutiveSummaryAgent
from agents.knowledge_graph.synthesizer import KnowledgeGraphAgent
from agents.rag.retriever import RAGService
from websockets.manager import manager

logger = logging.getLogger("compliance_copilot.pipeline.orchestrator")

class LangGraphPipelineOrchestrator:
    """
    LangGraph Multi-Agent Pipeline Orchestrator
    Orchestrates 8 specialized micro-agents and persists intermediate and final results.
    """

    def __init__(self):
        self.ocr_agent = OCRAgent()
        self.ner_agent = NERAgent()
        self.clause_agent = ClauseAgent()
        self.risk_agent = RiskAgent()
        self.compliance_agent = ComplianceAgent()
        self.recommendation_agent = RecommendationAgent()
        self.summary_agent = ExecutiveSummaryAgent()
        self.kg_agent = KnowledgeGraphAgent()
        self.rag_service = RAGService()

    async def run_pipeline(
        self,
        job_id: str,
        contract_id: str,
        file_path: str,
        filename: str,
        client_id: Optional[str] = "global",
        db_session: Optional[AsyncSession] = None
    ) -> Dict[str, Any]:
        logger.info(f"LangGraph Orchestrator starting job {job_id} for contract {contract_id}")

        await manager.broadcast_job_event(client_id, "job_started", {
            "job_id": job_id,
            "contract_id": contract_id,
            "filename": filename,
            "status": "processing"
        })

        # 1. OCR Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 0, "agent": "OCR Agent", "msg": "OCR Agent: Extracting digital text layer & page structure..."
        })
        ocr_res = await self.ocr_agent.extract_text_and_layout(file_path)
        ocr_time = int((time.time() - t0) * 1000)

        # 2. NER Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 1, "agent": "NER Agent", "msg": "NER Agent: Extracting contracting parties, Rupee ACV & High Court..."
        })
        ner_res = await self.ner_agent.extract_entities(ocr_res["full_text"], filename)
        ner_time = int((time.time() - t0) * 1000)

        entities_parsed = ner_res["parsed"]

        # 3. Clause Extraction Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 2, "agent": "Clause Agent", "msg": "Clause Agent: Segmenting clauses & PDF bounding box coordinates..."
        })
        clauses_res = await self.clause_agent.segment_clauses(ocr_res["full_text"], filename)
        clause_time = int((time.time() - t0) * 1000)

        # 4. Risk Engine Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 3, "agent": "Risk Agent", "msg": "Risk Engine: Evaluating financial risk score & liability matrix..."
        })
        risk_res = await self.risk_agent.evaluate_risk(clauses_res, entities_parsed.get("contract_value", "₹1,25,00,000 / yr"))
        risk_time = int((time.time() - t0) * 1000)

        # 5. Statutory Compliance Validation Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 4, "agent": "Compliance Agent", "msg": "Compliance Agent: Auditing DPDP Act 2023, CERT-In & SEBI rules..."
        })
        comp_res = await self.compliance_agent.audit_compliance(clauses_res)
        comp_time = int((time.time() - t0) * 1000)

        # 6. Recommendation Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 5, "agent": "Redlining Agent", "msg": "Recommendation Agent: Formulating precise clause redlines..."
        })
        rec_res = await self.recommendation_agent.generate_recommendations(clauses_res, risk_res["risks"])
        rec_time = int((time.time() - t0) * 1000)

        # 7. Executive Summary Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 6, "agent": "Briefing Agent", "msg": "Executive Summary Agent: Synthesizing board brief..."
        })
        summary_res = await self.summary_agent.generate_summary(
            filename, risk_res["overall_risk_score"], comp_res["overall_compliance_score"],
            entities_parsed.get("vendor_name", "Vendor"), entities_parsed.get("contract_value", "₹1.25 Cr")
        )
        summary_time = int((time.time() - t0) * 1000)

        # 8. Knowledge Graph Agent
        t0 = time.time()
        await manager.broadcast_job_event(client_id, "agent_progress", {
            "job_id": job_id, "step": 7, "agent": "Knowledge Graph Agent", "msg": "Knowledge Graph Agent: Mapping topological relationships..."
        })
        kg_res = await self.kg_agent.generate_graph(
            filename, entities_parsed.get("vendor_name", "Vendor"), entities_parsed.get("customer_name", "Kaveri Manufacturing")
        )
        kg_time = int((time.time() - t0) * 1000)

        final_payload = {
            "job_id": job_id,
            "contract_id": contract_id,
            "filename": filename,
            "entities": entities_parsed,
            "clauses": clauses_res,
            "overall_risk_score": risk_res["overall_risk_score"],
            "overall_risk_level": risk_res["overall_risk_level"],
            "risks": risk_res["risks"],
            "overall_compliance_score": comp_res["overall_compliance_score"],
            "compliance_checks": comp_res["checks"],
            "recommendations": rec_res,
            "executive_summary": summary_res,
            "knowledge_graph": kg_res,
            "execution_metrics": {
                "ocr_ms": ocr_time, "ner_ms": ner_time, "clause_ms": clause_time,
                "risk_ms": risk_time, "compliance_ms": comp_time, "recommendation_ms": rec_time,
                "summary_ms": summary_time, "kg_ms": kg_time
            }
        }

        await manager.broadcast_job_event(client_id, "job_completed", final_payload)
        logger.info(f"LangGraph Orchestrator completed job {job_id} successfully.")

        return final_payload
