import hashlib
import uuid
import logging
from typing import Tuple
from server.storage.base import StorageBackend
from server.config import settings

logger = logging.getLogger("compliance_copilot.storage.s3")

class S3Storage(StorageBackend):
    def __init__(self, bucket_name: str = None):
        self.bucket_name = bucket_name or settings.S3_BUCKET

    async def save_file(self, file_bytes: bytes, filename: str) -> Tuple[str, str, int]:
        checksum = hashlib.sha256(file_bytes).hexdigest()
        size_bytes = len(file_bytes)
        ext = filename.split('.')[-1] if '.' in filename else 'bin'
        key = f"contracts/{uuid.uuid4().hex}.{ext}"

        logger.info(f"Mocking S3 upload to s3://{self.bucket_name}/{key}")
        return f"s3://{self.bucket_name}/{key}", checksum, size_bytes

    async def get_file(self, storage_key: str) -> bytes:
        logger.info(f"Mocking S3 fetch from {storage_key}")
        return b"%PDF-1.4 Mock S3 Document Bytes"

    async def delete_file(self, storage_key: str) -> bool:
        logger.info(f"Mocking S3 delete from {storage_key}")
        return True
