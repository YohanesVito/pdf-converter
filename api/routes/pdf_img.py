from config import API_BASE_URL
from utils.file_utils import get_project_temp_dir, get_poppler_path
import tempfile, os, uuid, platform
from pdf2image import convert_from_path
import img2pdf
from pathlib import Path
from security import verify_api_key, limiter
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi import Request
router = APIRouter()

@router.post("/convert-image-to-pdf")
@limiter.limit("10/minute")
async def convert_image_to_pdf(
    request: Request,
    file: UploadFile = File(...),
    _: str = Depends(verify_api_key)
):
    temp_dir = Path(get_project_temp_dir())
    temp_dir.mkdir(parents=True, exist_ok=True)

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
        raise HTTPException(status_code=500, detail=f"Gagal mengonversi: {str(e)}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

# Endpoint: Convert PDF to Image
@router.post("/convert-pdf-to-image")
async def convert_pdf_to_image(file: UploadFile = File(...)):
    temp_dir = Path(get_project_temp_dir())
    temp_dir.mkdir(parents=True, exist_ok=True) 

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

        # Bangun URL download dengan path relatif
        download_urls = [
            f"{API_BASE_URL}/download/{os.path.relpath(path, temp_dir)}"
            for path in image_paths
        ]

        # Jika hanya satu halaman, kembalikan URL tunggal
        if len(download_urls) == 1:
            return {"fileUrl": download_urls[0]}
        
        # Jika lebih dari satu, kembalikan array
        return {"fileUrl": download_urls}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal mengonversi : {str(e)}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
