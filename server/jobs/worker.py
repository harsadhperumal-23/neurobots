import asyncio
import uuid
import logging
from typing import Dict, Any, Optional
from pipeline.orchestrator import LangGraphPipelineOrchestrator
from websockets.manager import manager

logger = logging.getLogger("compliance_copilot.jobs.worker")

class BackgroundJobManager:
    """
    Asynchronous Background Job Queue Manager
    Enqueues contract processing jobs, handles retries, logs execution errors, and triggers pipeline execution.
    """

    def __init__(self):
        self.active_jobs: Dict[str, Dict[str, Any]] = {}
        self.orchestrator = LangGraphPipelineOrchestrator()

    async def enqueue_analysis_job(
        self,
        contract_id: str,
        file_path: str,
        filename: str,
        client_id: Optional[str] = "global"
    ) -> str:
        job_id = f"job-{uuid.uuid4().hex[:8]}"

        job_record = {
            "job_id": job_id,
            "contract_id": contract_id,
            "filename": filename,
            "file_path": file_path,
            "status": "queued",
            "retry_count": 0,
            "max_retries": 3,
            "result": None,
            "error": None
        }

        self.active_jobs[job_id] = job_record
        logger.info(f"BackgroundJobManager: Enqueued job {job_id} for contract {contract_id}")

        # Spawn background processing task asynchronously
        asyncio.create_task(self._process_job_with_retry(job_id, client_id))

        return job_id

    async def _process_job_with_retry(self, job_id: str, client_id: str):
        job = self.active_jobs.get(job_id)
        if not job:
            return

        job["status"] = "processing"

        while job["retry_count"] <= job["max_retries"]:
            try:
                res = await self.orchestrator.run_pipeline(
                    job_id=job_id,
                    contract_id=job["contract_id"],
                    file_path=job["file_path"],
                    filename=job["filename"],
                    client_id=client_id
                )
                job["status"] = "completed"
                job["result"] = res
                return
            except Exception as e:
                job["retry_count"] += 1
                logger.error(f"Error processing job {job_id} (Attempt {job['retry_count']}): {e}")
                if job["retry_count"] > job["max_retries"]:
                    job["status"] = "failed"
                    job["error"] = str(e)
                    await manager.broadcast_job_event(client_id, "job_failed", {
                        "job_id": job_id,
                        "contract_id": job["contract_id"],
                        "error": str(e)
                    })
                    return
                await asyncio.sleep(1)

    def get_job_status(self, job_id: str) -> Optional[Dict[str, Any]]:
        return self.active_jobs.get(job_id)

job_manager = BackgroundJobManager()
