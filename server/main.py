import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.config import settings
from server.api.v1.endpoints import contracts, upload, analysis, reports, rag, websockets

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("compliance_copilot.server")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Compliance Copilot Enterprise FastAPI Server...")
    yield
    logger.info("Shutting down Compliance Copilot FastAPI Server...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Router Endpoints
app.include_router(upload.router, prefix=settings.API_V1_STR, tags=["Upload"])
app.include_router(contracts.router, prefix=settings.API_V1_STR, tags=["Contracts"])
app.include_router(analysis.router, prefix=settings.API_V1_STR, tags=["Analysis Jobs"])
app.include_router(reports.router, prefix=settings.API_V1_STR, tags=["Reports"])
app.include_router(rag.router, prefix=settings.API_V1_STR, tags=["RAG Assistant"])
app.include_router(websockets.router, prefix=settings.API_V1_STR, tags=["WebSockets"])

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
