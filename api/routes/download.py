from fastapi import APIRouter
import os
from utils.file_utils import get_project_temp_dir
from fastapi.responses import FileResponse
from fastapi import Path

router = APIRouter()

@router.get("/download/{file_path:path}")
async def download_file(file_path: str = Path(...)):
    project_temp_dir = get_project_temp_dir()
    project_file_path = os.path.join(project_temp_dir, file_path)

    if os.path.exists(project_file_path):
        return FileResponse(project_file_path, media_type="application/octet-stream", filename=os.path.basename(file_path))

    return {"error": "File not found"}