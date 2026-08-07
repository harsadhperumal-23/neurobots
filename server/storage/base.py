from abc import ABC, abstractmethod
from typing import Tuple

class StorageBackend(ABC):

    @abstractmethod
    async def save_file(self, file_bytes: bytes, filename: str) -> Tuple[str, str, int]:
        """
        Saves file to object storage returning:
        (storage_key, sha256_checksum, size_bytes)
        """
        pass

    @abstractmethod
    async def get_file(self, storage_key: str) -> bytes:
        """
        Retrieves raw file bytes from storage_key.
        """
        pass

    @abstractmethod
    async def delete_file(self, storage_key: str) -> bool:
        """
        Deletes file from storage.
        """
        pass
