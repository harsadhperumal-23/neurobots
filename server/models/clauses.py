import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from server.database import Base

class Clause(Base):
    __tablename__ = "clauses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    section_number = Column(String(100), nullable=True)
    clause_title = Column(String(255), nullable=False)
    clause_type = Column(String(100), nullable=False)
    raw_text = Column(Text, nullable=False)
    page_number = Column(Integer, nullable=False, default=1)
    bounding_box = Column(JSON, nullable=True) # { x, y, width, height }
    severity = Column(String(20), nullable=False, default="Medium")
    embedding = Column(Vector(1536), nullable=True) # Vector embedding for RAG Similarity
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="clauses")
    risks = relationship("Risk", back_populates="clause")
    recommendations = relationship("Recommendation", back_populates="clause")
