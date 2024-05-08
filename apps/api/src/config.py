import os

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(override=True)


def get_api_key():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError(
            "API key not found. Please set the ANTHROPIC_API_KEY environment variable."
        )
    return api_key
