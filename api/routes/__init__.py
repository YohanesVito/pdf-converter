from .pdf_img import router as pdf_img_router
# from .pdf_doc import router as pdf_doc_router
from .download import router as download_router
from .delete import router as delete_router

__all__ = [
    "pdf_img_router",
    # "pdf_doc_router",
    "download_router",
    "delete_router"
]
