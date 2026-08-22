import subprocess
import sys
import os
import time

def start_services():
    print("==================================================")
    print("🚀 Starting Semester Copilot Full-Stack System...")
    print("==================================================")

    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    print("[1/2] Starting FastAPI Backend on http://127.0.0.1:8000...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
        cwd=backend_dir
    )

    time.sleep(2)

    print("[2/2] Starting Vite Frontend on http://localhost:3000...")
    # On Windows npm is npm.cmd
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_process = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )

    print("\n✅ Semester Copilot is running live!")
    print("👉 Frontend: http://localhost:3000")
    print("👉 Backend API & Docs: http://localhost:8000/docs")
    print("👉 One-Click Demo Mode available on the landing page!")
    print("\nPress Ctrl+C to terminate both servers.")

    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_process.terminate()
        frontend_process.terminate()

if __name__ == "__main__":
    start_services()
