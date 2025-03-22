import os
import requests
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/analyze"

def analyze_with_groq(text):
    """Analyze text using Groq API"""
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    data = {"text": text}

    response = requests.post(GROQ_API_URL, json=data, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to get analysis from Groq API"}
