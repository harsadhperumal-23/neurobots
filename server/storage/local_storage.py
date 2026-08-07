import os
import hashlib
import uuid
import aiofiles
from typing import Tuple
from server.storage.base import StorageBackend
from server.config import settings

class LocalStorage(StorageBackend):
    def __init__(self, base_dir: str = None):
        self.base_dir = os.path.abspath(base_dir or settings.LOCAL_STORAGE_DIR)
        os.makedirs(self.base_dir, exist_ok=True)

    async def save_file(self, file_bytes: bytes, filename: str) -> Tuple[str, str, int]:
        checksum = hashlib.sha256(file_bytes).hexdigest()
        size_bytes = len(file_bytes)
        ext = os.path.splitext(filename)[1]
        unique_name = f"{uuid.uuid4().hex}{ext}"
        storage_key = os.path.join(self.base_dir, unique_name)

        async with aiofiles.open(storage_key, 'wb') as f:
            await f.write(file_bytes)

        return storage_key, checksum, size_bytes

    async def get_file(self, storage_key: str) -> bytes:
        if not os.path.exists(storage_key):
            raise FileNotFoundError(f"Storage file not found: {storage_key}")

        async with aiofiles.open(storage_key, 'rb') as f:
            return await f.read()

    async def delete_file(self, storage_key: str) -> bool:
        if os.path.exists(storage_key):
            os.remove(storage_key)
            return True
        return False
