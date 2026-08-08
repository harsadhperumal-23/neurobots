import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import init_db
from api.v1.endpoints import contracts, upload, analysis, reports, rag, websockets, dashboard, compliance, knowledge_graph

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("compliance_copilot.server")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Compliance Copilot Enterprise FastAPI Server...")
    # Safe startup error wrapping: ensure external service failures never exit FastAPI
    try:
        await init_db()
    except Exception as e:
        logger.warning(f"Database initialization encountered an exception: {e}. App continuing startup.")
    
    yield
    
    logger.info("Shutting down Compliance Copilot Enterprise FastAPI Server...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router Registration
app.include_router(upload.router, prefix=settings.API_V1_STR, tags=["Upload"])
app.include_router(contracts.router, prefix=settings.API_V1_STR, tags=["Contracts"])
app.include_router(analysis.router, prefix=settings.API_V1_STR, tags=["Analysis Jobs"])
app.include_router(reports.router, prefix=settings.API_V1_STR, tags=["Reports"])
app.include_router(rag.router, prefix=settings.API_V1_STR, tags=["RAG Assistant"])
app.include_router(websockets.router, prefix=settings.API_V1_STR, tags=["WebSockets"])
app.include_router(dashboard.router, prefix=settings.API_V1_STR, tags=["Dashboard"])
app.include_router(compliance.router, prefix=settings.API_V1_STR, tags=["Compliance"])
app.include_router(knowledge_graph.router, prefix=settings.API_V1_STR, tags=["Knowledge Graph"])

@app.get("/", tags=["System"])
async def root():
    return {
        "title": settings.PROJECT_NAME,
        "tagline": "AI-Native Enterprise Legal Intelligence Platform",
        "version": settings.VERSION,
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
