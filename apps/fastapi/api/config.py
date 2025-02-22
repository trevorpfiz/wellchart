import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


# Otherwise, the root path will be the local host. ROOT_PATH is an env var configured in Vercel deployment.
# The value for production is equal to the root path of the deployment URL in Vercel.
ROOT_PATH = os.getenv("ROOT_PATH", "http://127.0.0.1:8000")


class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI App"
    PROJECT_DESCRIPTION: str = "A simple FastAPI app"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

    model_config = SettingsConfigDict(env_file=".env")
    openapi_url: str = "/openapi.json"
    API_VERSION: str = "/v1"
    ROOT: str = ROOT_PATH


settings = Settings()
