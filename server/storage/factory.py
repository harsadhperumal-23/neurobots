from storage.base import StorageBackend
from storage.local_storage import LocalStorage
from storage.s3_storage import S3Storage
from config import settings

def get_storage_backend() -> StorageBackend:
    if settings.STORAGE_BACKEND.lower() == "s3":
        return S3Storage()
    return LocalStorage()
