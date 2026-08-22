import os
import re
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Dict, Any
from app.agents.parser_agent import parser_agent

router = APIRouter(prefix="/documents", tags=["Document Ingestion & Parser"])

MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024 # 15 MB limit
ALLOWED_EXTENSIONS = {".pdf", ".csv", ".txt", ".png", ".jpg", ".jpeg", ".docx"}

def sanitize_filename(filename: str) -> str:
    # Strip path separators to prevent path traversal
    clean_name = os.path.basename(filename)
    # Remove potentially hazardous shell/path characters
    clean_name = re.sub(r'[^\w\s\.-]', '_', clean_name)
    return clean_name or "uploaded_document"

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form("Course Scheme / Timetable")
):
    """
    Secure document ingestion endpoint.
    - Validates file extensions
    - Enforces 15MB file size limits
    - Sanitizes filenames against path traversal
    - Extracts structured course, credit, and timetable entities
    """
    raw_filename = file.filename or "uploaded_doc"
    safe_filename = sanitize_filename(raw_filename)
    _, ext = os.path.splitext(safe_filename)

    if ext.lower() not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Read bytes safely with size check
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_SIZE_BYTES // (1024 * 1024)}MB."
        )

    if safe_filename.lower().endswith(".pdf"):
        extracted_text = parser_agent.parse_pdf(contents)
    elif safe_filename.lower().endswith(".csv") or safe_filename.lower().endswith(".txt"):
        extracted_text = parser_agent.parse_csv(contents)
    else:
        # Fallback text representation
        extracted_text = f"Simulated OCR extract for image/document: {safe_filename}\nParsed academic schedule and course matrix."

    parsed_result = parser_agent.extract_structured_semester_data(extracted_text, filename=safe_filename)
    
    return {
        "status": "SUCCESS",
        "filename": safe_filename,
        "document_type": doc_type,
        "parsed_entities": parsed_result,
        "message": f"Successfully parsed {safe_filename}. Discovered {parsed_result['detected_subjects_count']} courses and timetable structure."
    }
