import uvicorn
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
origins = [
    "https://tools.tugra-dev.my.id",
    "http://localhost:3000",      # Untuk pengembangan lokal
    "http://192.168.100.2:3000",  # IP frontend Anda
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tools.tugra-dev.my.id"],  # Daftar origin yang diizinkan
    allow_credentials=True,
    allow_methods=["*"],  # Metode HTTP yang diizinkan (GET, POST, dll.)
    allow_headers=["*"],  # Header yang diizinkan
)

@app.post("/convert-to-pdf")
async def convert_to_pdf(file: UploadFile = File(...)):
    # Buat file sementara menggunakan tempfile
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1]) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF
    output_path = tempfile.mktemp(suffix=".pdf")

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
    # Simpan file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1]) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF
    output_path = tempfile.mktemp(suffix=".pdf")

    try:
        # Konversi gambar ke PDF
        with open(output_path, "wb") as f:
            f.write(img2pdf.convert(file_path))

        # Kembalikan file PDF sebagai respons
        return {"url": f"{API_BASE_URL}/download/{os.path.basename(output_path)}"}
    except Exception as e:
        return {"error": f"Gagal mengonversi gambar ke PDF: {str(e)}"}
    finally:
        # Hapus file sementara
        if os.path.exists(file_path):
            os.remove(file_path)

# Endpoint: Convert PDF to Image
@app.post("/convert-pdf-to-image")
async def convert_pdf_to_image(file: UploadFile = File(...)):
    # Simpan file sementara di direktori proyek
    temp_dir = "e:/pdf-converter/temp"
    os.makedirs(temp_dir, exist_ok=True)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf", dir=temp_dir) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk gambar
    output_dir = tempfile.mkdtemp(dir=temp_dir)

    try:
        # Tentukan path ke Poppler jika tidak ada di PATH sistem
        poppler_path = r"C:\poppler\poppler-24.08.0\Library\bin"

        # Logika konversi PDF ke gambar
        images = convert_from_path(file_path, output_folder=output_dir, poppler_path=poppler_path)

        # Simpan gambar ke direktori sementara
        image_paths = []
        for i, image in enumerate(images):
            image_path = os.path.join(output_dir, f"page_{i + 1}.jpg")
            image.save(image_path, "JPEG")

            # Salin file ke direktori sementara global
            global_temp_path = os.path.join(tempfile.gettempdir(), f"page_{i + 1}.jpg")
            shutil.copy(image_path, global_temp_path)

            # Tambahkan path global ke daftar
            image_paths.append(global_temp_path)

        print(f"Generated image paths: {image_paths}")

        # Jika hanya satu halaman, kembalikan URL tunggal
        if len(image_paths) == 1:
            return {"url": f"{API_BASE_URL}/download/{os.path.basename(image_paths[0])}"}

        # Jika lebih dari satu halaman, kembalikan daftar URL
        return {"images": [f"{API_BASE_URL}/download/{os.path.basename(path)}" for path in image_paths]}
    except Exception as e:
        return {"error": f"Gagal mengonversi PDF ke gambar: {str(e)}"}
    finally:
        # Hapus file sementara
        if os.path.exists(file_path):
            os.remove(file_path)

@app.post("/convert-word-to-pdf")
async def convert_word_to_pdf(file: UploadFile = File(...)):
    # Simpan file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF
    output_path = tempfile.mktemp(suffix=".pdf")

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
    output_path = tempfile.mktemp(suffix=".docx")

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
    file_path = os.path.join(tempfile.gettempdir(), filename)
    print(f"Looking for file at: {file_path}")  # Tambahkan log untuk memeriksa lokasi file
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="application/octet-stream", filename=filename)
    return {"error": "File not found"}

@app.post("/compress-pdf")
async def compress_pdf(file: UploadFile = File(...)):
    # Simpan file yang diunggah ke file sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix="." + file.filename.split(".")[-1]) as temp_file:
        file_path = temp_file.name
        temp_file.write(await file.read())

    # Tentukan output path untuk file PDF terkompresi
    output_path = tempfile.mktemp(suffix=".pdf")

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
        output_path = tempfile.mktemp(suffix=".pdf")
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
    zip_path = os.path.join(temp_dir, "pdf_to_image.zip")

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
        # Direktori sementara global
        global_temp_dir = tempfile.gettempdir()
        # Direktori sementara khusus proyek
        project_temp_dir = "e:/pdf-converter/temp"

        for file_url in file_urls.file_urls:
            # Hapus file dari direktori sementara global
            global_file_path = os.path.join(global_temp_dir, os.path.basename(file_url))
            if os.path.exists(global_file_path):
                print(f"Deleting temporary file from global temp: {global_file_path}")
                os.remove(global_file_path)

            # Cari file di semua subdirektori dalam project_temp_dir
            found = False
            for root, dirs, files in os.walk(project_temp_dir):
                project_file_path = os.path.join(root, os.path.basename(file_url))
                if os.path.exists(project_file_path):
                    print(f"Deleting temporary file from project temp: {project_file_path}")
                    # Hapus folder tempat file berada
                    shutil.rmtree(root)
                    print(f"Deleted folder: {root}")
                    found = True
                    break

            if not found:
                print(f"File not found in project temp: {os.path.basename(file_url)}")

        return {"message": "Temporary files and folders deleted successfully"}
    except Exception as e:
        return {"error": f"Failed to delete temporary files or folders: {str(e)}"}
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)