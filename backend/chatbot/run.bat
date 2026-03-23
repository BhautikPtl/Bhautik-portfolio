@echo off
cd /d "%~dp0"
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
python -m uvicorn chatbot:app --reload --host 0.0.0.0 --port 8000
pause
