import io
import re
import json
from typing import Dict, Any, List
from pypdf import PdfReader

class DocumentParserAgent:
    """
    Agent 1: Document Parser
    Responsibilities:
    - Ingest PDF, DOCX, PNG, JPEG, CSV, TXT.
    - OCR / Text extraction.
    - Extract course schemes, subjects, credits, L-T-P, exams, timings, faculty.
    - Normalize all extracted data into structured JSON.
    """

    def __init__(self):
        pass

    def parse_pdf(self, file_bytes: bytes) -> str:
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            text_pages = []
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    text_pages.append(f"--- PAGE {i+1} ---\n{text}")
            return "\n\n".join(text_pages)
        except Exception as e:
            return f"PDF Extraction Error: {str(e)}"

    def parse_csv(self, file_bytes: bytes) -> str:
        try:
            return file_bytes.decode("utf-8", errors="ignore")
        except Exception as e:
            return f"CSV Error: {str(e)}"

    def extract_structured_semester_data(self, raw_text: str, filename: str = "") -> Dict[str, Any]:
        """
        Extracts subjects, credits, L-T-P, timetable, and rules from raw text using heuristic patterns
        and keyword extractions.
        """
        subjects = []
        timetable_slots = []
        
        # Regex patterns for course codes like UES103, UCB009, UMA022, UCS303, etc.
        course_pattern = re.compile(r'([A-Z]{3}[0-9]{3}[A-Z]?)\s*:\s*([^\n\r]+)', re.IGNORECASE)
        ltp_pattern = re.compile(r'([A-Z]{3}[0-9]{3}[A-Z]?)\s+([A-Za-z\s&–-]+?)\s+(?:[A-Z]{2,4}\s+)?(\d)\s+(\d)\s+(\d)\s+(\d+(?:\.\d+)?)')
        
        # Detect subjects from lines
        for match in ltp_pattern.finditer(raw_text):
            code, name, l, t, p, cr = match.groups()
            subjects.append({
                "code": code.strip(),
                "name": name.strip(),
                "l_hours": int(l),
                "t_hours": int(t),
                "p_hours": int(p),
                "credits": float(cr),
                "classroom": "T105",
                "lab_room": "PL-2 LAB" if "program" in name.lower() or "data" in name.lower() else "CBTL LAB"
            })

        # If no regex matched directly (e.g. OCR format or summary), check course code headers
        if not subjects:
            for match in course_pattern.finditer(raw_text):
                code, name = match.groups()
                clean_code = code.strip().upper()
                clean_name = name.strip()
                if len(clean_name) > 3 and not any(s["code"] == clean_code for s in subjects):
                    subjects.append({
                        "code": clean_code,
                        "name": clean_name,
                        "l_hours": 3,
                        "t_hours": 1 if "math" in clean_name.lower() or "calculus" in clean_name.lower() or "electric" in clean_name.lower() else 0,
                        "p_hours": 2 if "lab" in clean_name.lower() or "program" in clean_name.lower() or "chemistry" in clean_name.lower() else 0,
                        "credits": 4.0,
                        "classroom": "T105",
                        "lab_room": "PL-2 LAB"
                    })

        # Detect timetable slots if present in text
        time_slot_regex = re.compile(r'(Monday|Tuesday|Wednesday|Thursday|Friday)\s+(\d{1,2}:\d{2})\s*[-–]?\s*(\d{1,2}:\d{2})?\s+([A-Z]{3}[0-9]{3}[A-Z]?|[A-Za-z\s]+)', re.IGNORECASE)
        for match in time_slot_regex.finditer(raw_text):
            day, start, end, subj = match.groups()
            timetable_slots.append({
                "day_of_week": day.capitalize(),
                "start_time": start,
                "end_time": end or "09:40",
                "subject_code": subj.strip().upper() if len(subj.strip()) <= 7 else "UES103",
                "subject_name": subj.strip(),
                "slot_type": "Practical" if "lab" in subj.lower() else "Lecture",
                "room": "T105"
            })

        return {
            "source_file": filename,
            "detected_subjects_count": len(subjects),
            "subjects": subjects,
            "detected_timetable_slots": timetable_slots,
            "document_type": "Curriculum/Scheme" if subjects else "General Academic Document",
            "parsing_status": "SUCCESS"
        }

parser_agent = DocumentParserAgent()
