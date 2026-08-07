import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from server.database import Base

class ComplianceCheck(Base):
    __tablename__ = "compliance_checks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    framework_id = Column(String(50), nullable=False)
    framework_name = Column(String(255), nullable=False)
    rule_id = Column(String(100), nullable=False)
    rule_description = Column(Text, nullable=False)
    status = Column(String(50), nullable=False) # 'Compliant', 'Non-Compliant', 'Action Needed'
    audit_findings = Column(Text, nullable=False)
    suggested_action = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="compliance_checks")
