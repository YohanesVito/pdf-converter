

from fastapi import APIRouter, File, UploadFile, HTTPException
router = APIRouter()

@router.post("/merge-pdfs")
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