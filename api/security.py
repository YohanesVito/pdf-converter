from fastapi import Request, Header, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()
VALID_API_KEYS = os.getenv("VALID_API_KEYS", "").split(",")
limiter = Limiter(key_func=get_remote_address)

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")

async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"error": "Too many requests"})
