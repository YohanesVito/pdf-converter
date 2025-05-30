import uvicorn
import platform
import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader, PdfWriter
from pdf2docx import Converter
from pdf2image import convert_from_path
import os
import img2pdf
from docx2pdf import convert
import tempfile
import shutil
import zipfile
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8001")

app = FastAPI()

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tools.tugra-dev.my.id",
        "http://localhost:3000",
        "http://192.168.100.2:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_project_temp_dir():
    if platform.system() == "Windows":
        return "e:/pdf-converter/temp"
    else:
        return "/tmp/pdf-converter"

def get_poppler_path():
    if platform.system() == "Windows":
        return r"C:\poppler\poppler-24.08.0\Library\bin"
    return None

    
@app.post("/convert-to-pdf")
async def convert_to_pdf(file: UploadFile = File(...)):
    # Buat file sementara menggunakan tempfile
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1]) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF
    output_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}.pdf")


    try:
        if file.filename.endswith(".docx"):
            # Konversi DOCX ke PDF
            convert(file_path, output_path)
        elif file.filename.endswith((".jpg", ".png")):
            # Konversi gambar ke PDF
            with open(output_path, "wb") as f:
                f.write(img2pdf.convert(file_path))
        else:
            return {"error": "Format file tidak didukung."}

        # Kembalikan file PDF sebagai respons
        # return FileResponse(output_path, media_type="application/pdf", filename="output.pdf")
        return {"url": f"{API_BASE_URL}/download/{os.path.basename(output_path)}"}
    except Exception as e:
        return {"error": f"Gagal mengonversi file: {str(e)}"}

    finally:
        # Hapus file sementara setelah selesai
        if os.path.exists(file_path):
            os.remove(file_path)

# Endpoint: Convert Image to PDF
@app.post("/convert-image-to-pdf")
async def convert_image_to_pdf(file: UploadFile = File(...)):
    temp_dir = get_project_temp_dir()
    os.makedirs(temp_dir, exist_ok=True)

    # Simpan file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1], dir=temp_dir) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Gunakan direktori sementara global agar bisa diakses oleh /download
    output_filename = f"tugra-{uuid.uuid4()}.pdf"  # Nama file unik
    output_path = os.path.join(get_project_temp_dir(), output_filename)

    try:
        # Konversi gambar ke PDF
        with open(output_path, "wb") as f:
            f.write(img2pdf.convert(file_path))

        return {"url": f"{API_BASE_URL}/download/{output_filename}"}
    except Exception as e:
        return {"error": f"Gagal mengonversi gambar ke PDF: {str(e)}"}
    # finally:
    #     if os.path.exists(file_path):
    #         os.remove(file_path)

# Endpoint: Convert PDF to Image
@app.post("/convert-pdf-to-image")
async def convert_pdf_to_image(file: UploadFile = File(...)):
    temp_dir = get_project_temp_dir()
    os.makedirs(temp_dir, exist_ok=True)

    # Simpan file PDF sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf", dir=temp_dir) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())
        print(f"Uploaded PDF saved at: {file_path}")

    # Buat direktori output unik dalam temp_dir
    output_folder_name = str(uuid.uuid4())
    output_dir = os.path.join(temp_dir, output_folder_name)
    os.makedirs(output_dir, exist_ok=True)
    print(f"Output directory for images: {output_dir}")

    try:
        # Konversi PDF ke gambar
        if platform.system() == "Windows":
            poppler_path = get_poppler_path()
            print(f"Using Poppler path: {poppler_path}")
            images = convert_from_path(file_path, output_folder=output_dir, poppler_path=poppler_path)
        else:
            images = convert_from_path(file_path, output_folder=output_dir)

        print(f"Number of images generated: {len(images)}")

        image_paths = []
        for i, image in enumerate(images):
            image_filename = f"page_{i + 1}.jpg"
            image_path = os.path.join(output_dir, image_filename)
            image.save(image_path, "JPEG")
            print(f"Saved image: {image_path}")
            image_paths.append(image_path)

        # Bangun URL download
        download_urls = [f"{API_BASE_URL}/download/{os.path.basename(path)}" for path in image_paths]

        # Jika hanya satu halaman, kembalikan URL tunggal
        if len(download_urls) == 1:
            return {"fileUrl": download_urls[0]}
        
        # Jika lebih dari satu, kembalikan array
        return {"fileUrl": download_urls}

    except Exception as e:
        print(f"Error during PDF to image conversion: {str(e)}")
        return {"error": f"Gagal mengonversi PDF ke gambar: {str(e)}"}

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.post("/convert-word-to-pdf")
async def convert_word_to_pdf(file: UploadFile = File(...)):
    # Simpan file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF
    output_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}.pdf")


    try:
        # Konversi Word ke PDF
        convert(file_path, output_path)

        # Kembalikan file PDF sebagai respons
        return {"url": f"{API_BASE_URL}/download/{os.path.basename(output_path)}"}
    except Exception as e:
        return {"error": f"Gagal mengonversi Word ke PDF: {str(e)}"}
    finally:
        # Hapus file sementara
        if os.path.exists(file_path):
            os.remove(file_path)

# Endpoint: Convert PDF to Word
@app.post("/convert-pdf-to-word")
async def convert_pdf_to_word(file: UploadFile = File(...)):
    # Simpan file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file Word
    output_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}.docx")


    try:
        # Logika konversi PDF ke Word (gunakan library seperti pdf2docx)
        cv = Converter(file_path)
        cv.convert(output_path)
        cv.close()

        # Kembalikan file Word sebagai respons
        return {"url": f"{API_BASE_URL}/download/{os.path.basename(output_path)}"}
    except Exception as e:
        return {"error": f"Gagal mengonversi PDF ke Word: {str(e)}"}
    finally:
        # Hapus file sementara
        if os.path.exists(file_path):
            os.remove(file_path)

# Endpoint: Download File
@app.get("/download/{filename}")
async def download_file(filename: str):
    # Cari di direktori proyek
    project_temp_dir = get_project_temp_dir()
    project_file_path = os.path.join(project_temp_dir, filename)

    if os.path.exists(project_file_path):
        return FileResponse(project_file_path, media_type="application/octet-stream", filename=filename)

    # Cari juga di direktori global sementara
    global_temp_dir = tempfile.gettempdir()
    global_file_path = os.path.join(global_temp_dir, filename)

    if os.path.exists(global_file_path):
        return FileResponse(global_file_path, media_type="application/octet-stream", filename=filename)

    return {"error": "File not found"}


@app.post("/compress-pdf")
async def compress_pdf(file: UploadFile = File(...)):
    # Simpan file yang diunggah ke file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1]) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF terkompresi
    output_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}.pdf")


    try:
        reader = PdfReader(file_path)
        writer = PdfWriter()

        for page in reader.pages:
            # Optimalkan setiap halaman
            page.compress_content_streams()
            writer.add_page(page)

        # Simpan hasil kompresi
        with open(output_path, "wb") as f:
            writer.write(f)

        # Kembalikan file PDF terkompresi sebagai respons
        return FileResponse(output_path, media_type="application/pdf", filename="compressed.pdf")

    except Exception as e:
        return {"error": f"Gagal mengompres file PDF: {str(e)}"}

    finally:
        # Hapus file sementara setelah selesai
        if os.path.exists(file_path):
            os.remove(file_path)

@app.post("/merge-pdfs")
async def merge_pdfs(files: list[UploadFile] = File(...)):
    # Daftar file PDF yang akan digabungkan
    pdf_files = []
    output_path = None
    try:
        for file in files:
            temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
            file_path = temp_pdf.name
            temp_pdf.write(await file.read())
            temp_pdf.close()
            pdf_files.append(file_path)

        # Tentukan output path untuk file PDF gabungan
        output_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}.pdf")

        writer = PdfWriter()

        for pdf_file in pdf_files:
            reader = PdfReader(pdf_file)
            for page in reader.pages:
                writer.add_page(page)

        # Simpan hasil penggabungan
        with open(output_path, "wb") as f:
            writer.write(f)

        # Kembalikan file PDF gabungan sebagai respons
        return FileResponse(output_path, media_type="application/pdf", filename="merged.pdf")

    except Exception as e:
        return {"error": f"Gagal menggabungkan file PDF: {str(e)}"}

    finally:
        # Hapus file sementara setelah selesai
        for file_path in pdf_files:
            if os.path.exists(file_path):
                os.remove(file_path)
        # Jangan hapus output_path di sini, biarkan FileResponse yang mengelola file tersebut

class FileUrls(BaseModel):
    file_urls: List[str]

@app.post("/create-zip")
async def create_zip(file_urls: FileUrls):
    # Direktori sementara untuk menyimpan file ZIP
    temp_dir = tempfile.gettempdir()
    zip_path = os.path.join(get_project_temp_dir(), f"tugra-{uuid.uuid4()}_pdf_to_image.zip")

    try:
        # Buat file ZIP
        with zipfile.ZipFile(zip_path, "w") as zipf:
            for file_url in file_urls.file_urls:
                file_path = os.path.join(temp_dir, os.path.basename(file_url))
                if os.path.exists(file_path):
                    zipf.write(file_path, os.path.basename(file_path))

        # Kembalikan file ZIP sebagai respons
        return FileResponse(zip_path, media_type="application/zip", filename="pdf_to_image.zip")
    except Exception as e:
        return {"error": f"Gagal membuat file ZIP: {str(e)}"}

@app.post("/delete-temp-files")
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

    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, limit_max_requests=100)