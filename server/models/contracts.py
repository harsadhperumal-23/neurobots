import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Numeric, DateTime, ForeignKey, BigInteger, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from server.database import Base

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    uploaded_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(500), nullable=False)
    vendor = Column(String(255), nullable=True)
    contract_type = Column(String(100), nullable=True)
    annual_value = Column(String(100), nullable=True)
    governing_law = Column(String(255), nullable=True)
    current_version_number = Column(Integer, default=1)
    status = Column(String(50), default="analyzed") # 'uploading', 'processing', 'analyzed', 'failed'
    overall_risk_score = Column(Integer, nullable=True)
    overall_risk_level = Column(String(20), default="High")
    overall_compliance_score = Column(Integer, nullable=True)
    confidence_score = Column(Numeric(5, 2), default=98.40)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="contracts")
    versions = relationship("ContractVersion", back_populates="contract", cascade="all, delete-orphan", order_by="ContractVersion.version_number.desc()")
    clauses = relationship("Clause", back_populates="contract", cascade="all, delete-orphan")
    entities = relationship("Entity", back_populates="contract", cascade="all, delete-orphan")
    risks = relationship("Risk", back_populates="contract", cascade="all, delete-orphan")
    compliance_checks = relationship("ComplianceCheck", back_populates="contract", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="contract", cascade="all, delete-orphan")
    executions = relationship("AIExecution", back_populates="contract", cascade="all, delete-orphan")


class ContractVersion(Base):
    __tablename__ = "contract_versions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(Integer, nullable=False, default=1)
    original_filename = Column(String(500), nullable=False)
    file_mime_type = Column(String(100), nullable=False)
    file_size_bytes = Column(BigInteger, nullable=False)
    file_checksum = Column(String(64), nullable=True) # SHA256 checksum
    storage_key = Column(String(1000), nullable=False) # S3 or Local storage path
    analysis_job_id = Column(String(100), nullable=True) # Celery/Redis Job ID
    processing_status = Column(String(50), default="queued") # 'queued', 'processing', 'completed', 'failed'
    extracted_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="versions")
