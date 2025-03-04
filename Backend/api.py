from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # To allow frontend requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

OPENROUTER_API_KEY = "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"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "yourwebsite.com",  # Replace with your domain
        "X-Title": "Chatbot App"
    }

    payload = {
        "model": "openai/gpt-4o-mini",
        "messages": [{"role": "user", "content": user_message}]
    }

    response = requests.post(url, headers=headers, json=payload)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
