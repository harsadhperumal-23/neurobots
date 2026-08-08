from fastapi import APIRouter, HTTPException
from jobs.worker import job_manager

router = APIRouter()

@router.get("/jobs/{job_id}")
async def get_job_status(job_id: str):
    job = job_manager.get_job_status(job_id)
    if not job:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found.")
    return job
