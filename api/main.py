import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import pdf_img_router, download_router, delete_router
from config import ALLOWED_ORIGINS
from security import limiter, rate_limit_handler

app = FastAPI()

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate Limit
app.state.limiter = limiter
app.add_exception_handler(429, rate_limit_handler)

# Include routers
app.include_router(pdf_img_router)
# app.include_router(pdf_doc_router)
app.include_router(download_router)
app.include_router(delete_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, limit_max_requests=100)