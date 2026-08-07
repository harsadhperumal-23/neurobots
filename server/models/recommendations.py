import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from server.database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    clause_id = Column(UUID(as_uuid=True), ForeignKey("clauses.id", ondelete="CASCADE"), nullable=True)
    suggested_redline_text = Column(Text, nullable=False)
    legal_rationale = Column(Text, nullable=False)
    risk_reduction_pct = Column(Integer, nullable=True)
    referenced_law = Column(String(255), nullable=True)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="recommendations")
    clause = relationship("Clause", back_populates="recommendations")
