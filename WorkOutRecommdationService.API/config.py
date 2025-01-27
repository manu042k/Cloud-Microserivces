import os
from dotenv import load_dotenv

def load_environment():
    """Load environment variables from .env file."""
    load_dotenv()
    os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")