from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# In a real app, this would be in a separate JSON or DB
RESPONSES = {
    "hello": "Hello! I'm Bhautik's portfolio assistant. How can I help you?",
    "skills": "Bhautik specializes in React, Node.js, MongoDB, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS.",
    "projects": "You can explore Bhautik's projects in the projects section. He has built several full-stack applications.",
    "contact": "You can contact Bhautik using the contact form at the bottom of the page or via email at vachhanib485@gmail.com.",
    "fallback": "I'm not sure about that. Please contact Bhautik directly via the contact form or LinkedIn."
}

@app.post("/chat")
async def chat(request: ChatRequest):
    msg = request.message.lower()
    
    if "hello" in msg or "hi" in msg:
        response = RESPONSES["hello"]
    elif "skill" in msg or "know" in msg:
        response = RESPONSES["skills"]
    elif "project" in msg:
        response = RESPONSES["projects"]
    elif "contact" in msg or "email" in msg or "call" in msg:
        response = RESPONSES["contact"]
    else:
        response = RESPONSES["fallback"]
        
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
