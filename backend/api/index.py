from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-code', methods=['POST'])
def generate_code():
    # Your existing code from app.py
    return {"message": "Hello from Flask!"}

# Vercel requires this wrapper
def handler(request):
    from flask import request as flask_request
    with app.request_context(flask_request.environ):
        return app.full_dispatch_request()