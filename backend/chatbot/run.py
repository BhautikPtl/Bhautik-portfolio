import subprocess
import sys
import os

# Change to the chatbot directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Install dependencies
print("📦 Installing dependencies...")
subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

# Run the chatbot
print("🚀 Starting Chatbot API on http://localhost:8000")
subprocess.call([sys.executable, "-m", "uvicorn", "chatbot:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])
