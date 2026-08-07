import uuid
import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from server.storage.factory import get_storage_backend
from server.jobs.worker import job_manager

logger = logging.getLogger("compliance_copilot.api.upload")

router = APIRouter()

@router.post("/upload")
async def upload_contract_file(
    file: UploadFile = File(...),
    client_id: str = Form(default="global")
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided.")

    allowed_exts = [".pdf", ".doc", ".docx"]
    ext = f".{file.filename.split('.')[-1].lower()}" if '.' in file.filename else ""
    if ext not in allowed_exts:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX.")

    file_bytes = await file.read()
    storage_backend = get_storage_backend()

    # Save to object storage
    storage_key, checksum, size_bytes = await storage_backend.save_file(file_bytes, file.filename)

    contract_id = f"CTR-2026-{uuid.uuid4().hex[:4].upper()}"

    # Enqueue background processing job
    job_id = await job_manager.enqueue_analysis_job(
        contract_id=contract_id,
        file_path=storage_key,
        filename=file.filename,
        client_id=client_id
    )

    return {
        "status": "queued",
        "job_id": job_id,
        "contract_id": contract_id,
        "filename": file.filename,
        "size_bytes": size_bytes,
        "checksum": checksum,
        "storage_key": storage_key
    }
