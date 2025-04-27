import requests
import json

# Define the URL for the backend API
url = 'http://127.0.0.1:5000/generate_code'

# Define the data to send (same as the frontend would send)
data = {
    "messages": [
        {"role": "user", "content": "Can you write a Python function to calculate Fibonacci?"},
        {"role": "assistant", "content": "Sure! Here's a Python function to calculate Fibonacci."}
    ]
}

# Send the POST request to the backend
response = requests.post(url, json=data)

# Print the response from the server
if response.status_code == 200:
    print("Response:", response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")
