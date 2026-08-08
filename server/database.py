import logging
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from config import settings

logger = logging.getLogger("compliance_copilot.database")

Base = declarative_base()

# Default PostgreSQL engine configuration
SQLITE_FALLBACK_URL = "sqlite+aiosqlite:///./compliance_copilot.db"

def create_db_engine():
    try:
        url = settings.DATABASE_URL
        if "sqlite" in url:
            engine = create_async_engine(url, echo=False, future=True)
        else:
            engine = create_async_engine(url, echo=False, future=True, pool_size=10, max_overflow=20)
        return engine
    except Exception as e:
        logger.warning(f"Failed to initialize primary database engine ({e}). Falling back to SQLite: {SQLITE_FALLBACK_URL}")
        return create_async_engine(SQLITE_FALLBACK_URL, echo=False, future=True)

engine = create_db_engine()

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

async def init_db():
    """
    Tests database connection and initializes tables gracefully.
    Falls back to SQLite if PostgreSQL is unreachable without crashing FastAPI.
    """
    global engine, AsyncSessionLocal
    try:
        async with engine.connect() as conn:
            logger.info("Successfully connected to database.")
            async with conn.begin():
                await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        logger.warning(f"PostgreSQL connection test failed: {e}. Falling back to SQLite: {SQLITE_FALLBACK_URL}")
        engine = create_async_engine(SQLITE_FALLBACK_URL, echo=False, future=True)
        AsyncSessionLocal = async_sessionmaker(
            bind=engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False
        )
        try:
            async with engine.connect() as conn:
                async with conn.begin():
                    await conn.run_sync(Base.metadata.create_all)
            logger.info("SQLite fallback database initialized successfully.")
        except Exception as sqlite_err:
            logger.error(f"SQLite fallback DB initialization warning: {sqlite_err}. Continuing app startup.")

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
