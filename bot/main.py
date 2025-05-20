from dotenv import load_dotenv
import os

load_dotenv()

# Get configuration from environment variables
BOT_TOKEN = os.getenv('BOT_TOKEN')
API_URL = os.getenv('API_URL')


# Validate required environment variables
if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN environment variable is not set")
if not API_URL:
    raise ValueError("API_URL environment variable is not set")
