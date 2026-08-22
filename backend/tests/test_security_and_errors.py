import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.routers.documents import sanitize_filename

client = TestClient(app)

def test_security_filename_sanitization():
    # Path traversal attempts
    assert sanitize_filename("../../../etc/passwd") == "passwd"
    assert sanitize_filename("..\\..\\windows\\system32\\calc.exe") == "calc.exe"
    # Special hazardous chars
    sanitized = sanitize_filename("test;rm -rf file.pdf")
    assert ";" not in sanitized
    assert "pdf" in sanitized
    # Trailing slash fallback
    assert sanitize_filename("invalid_folder/") == "uploaded_document"

def test_security_headers_middleware():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.headers.get("X-Content-Type-Options") == "nosniff"
    assert response.headers.get("X-Frame-Options") == "DENY"
    assert response.headers.get("X-XSS-Protection") == "1; mode=block"

def test_security_invalid_file_extension_rejection():
    file_payload = ("exploit.exe", b"binarycontent", "application/octet-stream")
    response = client.post("/api/documents/upload", files={"file": file_payload})
    assert response.status_code == 400
    assert "Unsupported file format" in response.json()["detail"]

def test_security_bunk_boundary_resilience():
    # Out of range subject
    response = client.post("/api/attendance/simulate-bunk", json={"subject_code": "NON_EXISTENT_999", "skips_planned": 5})
    assert response.status_code == 200
    data = response.json()
    assert data["is_safe"] is False
    assert "not found" in data["status_message"]

def test_master_state_schema_integrity():
    response = client.get("/api/planner/state")
    assert response.status_code == 200
    data = response.json()
    assert "user" in data
    assert "attendance" in data
    assert "timetable" in data
    assert "subjects" in data
    assert len(data["subjects"]) == 6
    assert len(data["timetable"]) == 31
