import os
import json
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        self.client = None
        self._setup_client()

    def _setup_client(self):
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel("gemini-1.5-flash")
                self.client = True
            except Exception as e:
                print(f"Gemini Init Warning: {e}")
                self.client = None

    def generate_chat_response(self, prompt: str, system_context: str) -> Optional[str]:
        if not self.client:
            return None
        try:
            full_prompt = f"System Context:\n{system_context}\n\nUser Question:\n{prompt}\n\nProvide a concise, helpful, and beautifully formatted response:"
            response = self.model.generate_content(full_prompt)
            if response and response.text:
                return response.text
        except Exception as e:
            print(f"Gemini API call error: {e}")
            return None
        return None

    def parse_document_with_ai(self, document_text: str) -> Optional[Dict[str, Any]]:
        if not self.client:
            return None
        try:
            prompt = (
                "You are an academic curriculum parser. Extract subjects, codes, credits, L-T-P, and classrooms. "
                "Output MUST be valid JSON with keys: subjects (list of {code, name, l_hours, t_hours, p_hours, credits, classroom}).\n\n"
                f"Document Text:\n{document_text[:4000]}"
            )
            response = self.model.generate_content(prompt)
            if response and response.text:
                text = response.text.replace("```json", "").replace("```", "").strip()
                return json.loads(text)
        except Exception as e:
            print(f"Gemini Parse Error: {e}")
            return None
        return None

gemini_service = GeminiService()
