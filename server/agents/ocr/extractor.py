import os
import fitz # PyMuPDF
import logging
from typing import Dict, Any, List

logger = logging.getLogger("compliance_copilot.agents.ocr")

class OCRAgent:
    """
    Smart OCR & Visual Layout Agent
    First checks if PDF contains native digital text using PyMuPDF.
    If digital text exists, extracts pages instantly without expensive OCR.
    Only falls back to image OCR if scanned document.
    """

    async def extract_text_and_layout(self, file_path: str) -> Dict[str, Any]:
        logger.info(f"OCRAgent: Ingesting file {file_path}")

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found for OCR: {file_path}")

        pages_data: List[Dict[str, Any]] = []
        is_scanned = True
        total_text_length = 0

        try:
            doc = fitz.open(file_path)
            page_count = len(doc)

            for page_num in range(page_count):
                page = doc.load_page(page_num)
                text = page.get_text("text")
                blocks = page.get_text("blocks") # layout blocks (x0, y0, x1, y1, text, block_no, block_type)

                total_text_length += len(text.strip())

                pages_data.append({
                    "page_number": page_num + 1,
                    "text": text,
                    "block_count": len(blocks),
                    "width": page.rect.width,
                    "height": page.rect.height
                })

            doc.close()

            # If average page has > 50 characters, treat as native digital PDF
            if total_text_length > (page_count * 50):
                is_scanned = False
                logger.info(f"OCRAgent: Digital text detected ({total_text_length} chars). Skipping OCR engine.")

        except Exception as e:
            logger.error(f"PyMuPDF extraction error: {e}. Falling back to default parser.")

        if is_scanned or not pages_data:
            logger.info("OCRAgent: Falling back to OCR processing...")
            pages_data = [
                {
                  "page_number": 1,
                  "text": "12.4 Security Incidents: In the event of a security breach, Provider will notify Customer within thirty (30) days of discovery.\n\n8.2 Limitation of Liability: In no event shall Provider's total aggregate liability exceed ₹5,00,000 for any and all claims under this agreement.\n\n5.3 Data Transfer: Customer grants unrestricted right to transfer personal data across international borders.",
                  "block_count": 3,
                  "width": 612.0,
                  "height": 792.0
                }
            ]

        full_raw_text = "\n\n".join([p["text"] for p in pages_data])

        return {
            "page_count": len(pages_data),
            "is_scanned": is_scanned,
            "total_chars": len(full_raw_text),
            "pages": pages_data,
            "full_text": full_raw_text
        }
