#!/bin/bash
cd "$(dirname "$0")"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn chatbot:app --reload --host 0.0.0.0 --port 8000
