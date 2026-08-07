from server.storage.base import StorageBackend
from server.storage.local_storage import LocalStorage
from server.storage.s3_storage import S3Storage
from server.config import settings

def get_storage_backend() -> StorageBackend:
    if settings.STORAGE_BACKEND.lower() == "s3":
        return S3Storage()
    return LocalStorage()
