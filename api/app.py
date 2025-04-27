import sys
# if '/var/task' in sys.path:
#     sys.path.remove('/var/task')  # Fix Vercel's Python path conflict

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from groq import Groq
from typing import Optional, Union, List, Dict
sys.path.append(os.path.join(os.path.dirname(__file__), 'python'))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def generate_code_with_groq(
    prompt: str,
    model: str = "llama3-70b-8192",
    temperature: float = 0.3,
    max_tokens: Optional[int] = 1024,
    top_p: float = 0.9,
    frequency_penalty: float = 0,
    presence_penalty: float = 0,
    stop: Optional[Union[str, List[str]]] = None,
    system_message: Optional[str] = None
) -> str:
    """
    Generate code using Groq API with customizable parameters.
    """
    messages = []
    
    if system_message:
        messages.append({
            "role": "system",
            "content": system_message
        })
    
    messages.append({
        "role": "user",
        "content": prompt
    })

    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
            stop=stop
        )
        
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        raise Exception(f"Groq API error: {str(e)}")

@app.route('/generate-code', methods=['POST'])
def generate_code():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Customize the system message for code generation
        system_message = (
            "You are an expert code assistant. Generate clean, efficient, and well-formatted code snippets "
            "based on the user's request. Include relevant comments when appropriate. "
            "Respond only with the code block unless the user specifically asks for explanations."
        )
        
        # Generate code with optimized parameters for code generation
        generated_code = generate_code_with_groq(
            prompt=prompt,
            model="llama3-70b-8192",  # Using the most powerful available model
            temperature=0.3,  # Lower temperature for more deterministic code
            max_tokens=2048,  # Increased token limit for longer code snippets
            system_message=system_message
        )
        
        return jsonify({
            'generatedCode': generated_code,
            'modelUsed': "llama3-70b-8192",
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

def vercel_handler(request):
    with app.test_request_context(path=request.path, method=request.method, headers=request.headers, data=request.body):
        return app.full_dispatch_request()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

