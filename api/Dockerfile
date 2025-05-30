FROM python:3.11-slim

# Set environment variables to avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Install system dependencies, including poppler-utils
RUN apt-get update && apt-get install -y --no-install-recommends \
    poppler-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# ✅ Buat folder temp setelah semua file disalin
RUN mkdir -p /app/temp

# Command to run the FastAPI application
EXPOSE 8001

# Command to run the FastAPI application
CMD ["python", "main.py"]
