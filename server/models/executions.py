import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class AIExecution(Base):
    __tablename__ = "ai_executions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)
    agent_name = Column(String(100), nullable=False)
    execution_status = Column(String(50), nullable=False)
    execution_time_ms = Column(Integer, nullable=False, default=0)
    token_usage = Column(JSON, nullable=True) # { prompt_tokens, completion_tokens, total_tokens, estimated_cost_usd }
    log_output = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    contract = relationship("Contract", back_populates="executions")
