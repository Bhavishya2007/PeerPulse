from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Settings(BaseSettings):

    database_url: str = (
        "postgresql+psycopg2://postgres:postgres@localhost:5432/peerpulse"
    )

    secret_key: str = "change-me"

    access_token_expire_minutes: int = 60

    ollama_url: str = "http://localhost:11434"

    llama_model: str = "llama3"

    frontend_url: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()


engine = create_engine(
    settings.database_url,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)