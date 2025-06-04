
import os
from utils.file_utils import get_project_temp_dir
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()
class FileUrls(BaseModel):
    file_urls: List[str]

@router.post("/delete-temp-files")
async def delete_temp_files(file_urls: FileUrls):
    try:
        project_temp_dir = get_project_temp_dir()

        for file_url in file_urls.file_urls:
            filename = os.path.basename(file_url)
            file_path = os.path.join(project_temp_dir, filename)

            if os.path.exists(file_path):
                print(f"Deleting temporary file: {file_path}")
                os.remove(file_path)
            else:
                print(f"File not found: {file_path}")

        return {"message": "Temporary files deleted successfully"}
    except Exception as e:
        return {"error": f"Failed to delete temporary files: {str(e)}"}