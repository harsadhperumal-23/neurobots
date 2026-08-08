import uuid
from datetime import datetime
from sqlalchemy import Column, String, Numeric, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class Risk(Base):
    __tablename__ = "risks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    clause_id = Column(UUID(as_uuid=True), ForeignKey("clauses.id", ondelete="SET NULL"), nullable=True)
    severity = Column(String(20), nullable=False, default="High")
    category = Column(String(100), nullable=False)
    issue_description = Column(Text, nullable=False)
    violating_regulation = Column(String(255), nullable=True)
    financial_impact = Column(Text, nullable=True)
    confidence_score = Column(Numeric(5, 2), default=98.00)
    status = Column(String(50), default="flagged")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="risks")
    clause = relationship("Clause", back_populates="risks")
