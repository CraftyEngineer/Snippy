import os
from typing import Optional
import requests

class GroqClient:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.base_url = "https://api.groq.com/openai/v1"
        
    def chat_completions_create(self, messages, model="llama3-70b-8192", **kwargs):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "messages": messages,
            "model": model,
            **kwargs
        }
        response = requests.post(
            f"{self.base_url}/chat/completions",
            json=payload,
            headers=headers
        )
        response.raise_for_status()
        return response.json()