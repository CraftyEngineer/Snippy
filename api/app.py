from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_client import GroqClient  # Use our custom client
import os

app = Flask(__name__)
CORS(app)

client = GroqClient()  # Initialize our HTTP client

@app.route('/generate-code', methods=['POST'])
def generate_code():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        
        if not prompt:
            return jsonify({'error': 'Prompt required'}), 400
            
        response = client.chat_completions_create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
            temperature=0.3
        )
        
        return jsonify({
            'generatedCode': response['choices'][0]['message']['content'],
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500