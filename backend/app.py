# app.py
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from typing import Dict, Any
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/api/classify-image', methods=['POST'])
def classify_image() -> Dict[str, Any]:
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    # Perform image classification...
    return jsonify({'label': 'cat'})

if __name__ == '__main__':
    app.run(debug=True)
