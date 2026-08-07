import os
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
  PROJECT_NAME: str = "Compliance Copilot Enterprise API"
  VERSION: str = "1.0.0"
  API_V1_STR: str = "/api/v1"

  # PostgreSQL + pgvector connection string (strictly required)
  DATABASE_URL: str = Field(
      default="postgresql+asyncpg://postgres:postgres@localhost:5432/compliance_copilot",
      env="DATABASE_URL"
  )

  # Redis Connection for Background Tasks & PubSub
  REDIS_URL: str = Field(
      default="redis://localhost:6379/0",
      env="REDIS_URL"
  )

  # Object Storage (S3 / Local Media)
  STORAGE_BACKEND: str = Field(default="local", env="STORAGE_BACKEND") # 'local' or 's3'
  LOCAL_STORAGE_DIR: str = Field(default="./server/media", env="LOCAL_STORAGE_DIR")
  S3_BUCKET: str = Field(default="compliance-copilot-contracts", env="S3_BUCKET")
  AWS_REGION: str = Field(default="ap-south-1", env="AWS_REGION")

  # AI Provider Settings (OpenAI, Claude, Gemini, Azure)
  DEFAULT_AI_PROVIDER: str = Field(default="openai", env="DEFAULT_AI_PROVIDER")
  OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
  OPENAI_MODEL: str = Field(default="gpt-4o", env="OPENAI_MODEL")
  ANTHROPIC_API_KEY: str = Field(default="", env="ANTHROPIC_API_KEY")
  GEMINI_API_KEY: str = Field(default="", env="GEMINI_API_KEY")

  # CORS Settings
  ALLOWED_ORIGINS: list[str] = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "*"
  ]

  class Config:
    env_file = ".env"
    extra = "ignore"

settings = Settings()
