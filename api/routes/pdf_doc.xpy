from fastapi import APIRouter, File, UploadFile
from config import API_BASE_URL
from utils.file_utils import get_project_temp_dir, get_poppler_path
import tempfile, os, uuid, platform
from pdf2image import convert_from_path
import img2pdf

router = APIRouter()

@router.post("/convert-word-to-pdf")
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
@router.post("/convert-pdf-to-word")
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
