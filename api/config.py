import os
from dotenv import load_dotenv

load_dotenv()
API_BASE_URL = os.getenv("API_BASE_URL", "")

ALLOWED_ORIGINS = [
    "https://tech.tugra-dev.my.id",
    "https://dev.tugra-dev.my.id"
    "http://localhost:3000",
    "http://192.168.100.2:3000"
]

