import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from pydantic import Field

# Explicitly load .env and malayalam.env files from server directory
base_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(base_dir, ".env"))
load_dotenv(os.path.join(base_dir, "malayalam.env"))

class Settings(BaseSettings):
  PROJECT_NAME: str = "Compliance Copilot Enterprise API"
  VERSION: str = "1.0.0"
  API_V1_STR: str = "/api/v1"

  # PostgreSQL + pgvector connection string
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
  STORAGE_BACKEND: str = Field(default="local", env="STORAGE_BACKEND")
  LOCAL_STORAGE_DIR: str = Field(default="./server/media", env="LOCAL_STORAGE_DIR")
  S3_BUCKET: str = Field(default="compliance-copilot-contracts", env="S3_BUCKET")
  AWS_REGION: str = Field(default="ap-south-1", env="AWS_REGION")

  # AI Provider Settings (Gemini, OpenAI, Claude)
  DEFAULT_AI_PROVIDER: str = Field(default="auto", env="DEFAULT_AI_PROVIDER")
  GEMINI_API_KEY: str = Field(default="", env="GEMINI_API_KEY")
  OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
  ANTHROPIC_API_KEY: str = Field(default="", env="ANTHROPIC_API_KEY")
  LLM_MODEL: str = Field(default="", env="LLM_MODEL")
  TEMPERATURE: float = Field(default=0.2, env="TEMPERATURE")
  MAX_TOKENS: int = Field(default=2048, env="MAX_TOKENS")

  # CORS Settings
  ALLOWED_ORIGINS: list[str] = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "*"
  ]

  class Config:
    env_file = (".env", "malayalam.env")
    extra = "ignore"

settings = Settings()
