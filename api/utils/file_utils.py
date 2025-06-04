import platform

def get_project_temp_dir():
    if platform.system() == "Windows":
        return "e:/pdf-converter/temp"
    else:
        return "/tmp/pdf-converter"

def get_poppler_path():
    if platform.system() == "Windows":
        return r"C:\poppler\poppler-24.08.0\Library\bin"
    return None

# class FileUrls(BaseModel):
#     file_urls: List[str]

# @app.post("/create-zip")
# async def create_zip(file_urls: FileUrls):
#     # Direktori sementara untuk menyimpan file ZIP
#     temp_dir = tempfile.gettempdir()
#     zip_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}_pdf_to_image.zip")

#     try:
#         # Buat file ZIP
#         with zipfile.ZipFile(zip_path, "w") as zipf:
#             for file_url in file_urls.file_urls:
#                 file_path = os.path.join(temp_dir, os.path.basename(file_url))
#                 if os.path.exists(file_path):
#                     zipf.write(file_path, os.path.basename(file_path))

#         # Kembalikan file ZIP sebagai respons
#         return FileResponse(zip_path, media_type="application/zip", filename="pdf_to_image.zip")
#     except Exception as e:
#         return {"error": f"Gagal membuat file ZIP: {str(e)}"}