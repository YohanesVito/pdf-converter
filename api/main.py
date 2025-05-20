from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter
import os
import img2pdf
from docx2pdf import convert
import tempfile

app = FastAPI()

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
        return FileResponse(output_path, media_type="application/pdf", filename="output.pdf")

    except Exception as e:
        return {"error": f"Gagal mengonversi file: {str(e)}"}

    finally:
        # Hapus file sementara setelah selesai
        if os.path.exists(file_path):
            os.remove(file_path)
        # Jangan hapus output_path di sini, biarkan FileResponse yang mengelola file tersebut

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
        # Jangan hapus output_path di sini, biarkan FileResponse yang mengelola file tersebut

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