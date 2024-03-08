# app.py
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from typing import Dict, Any
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
DETR_API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-101"
HEADERS = {"Authorization": "Bearer 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"}


@app.route('/api/classify-image', methods=['POST'])
def classify_image() -> Dict[str, Any]:
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    response = requests.post(DETR_API_URL, headers=HEADERS, data=image.read())
    result = response.json()
    # Perform image classification...
    return jsonify({"data": result}), 200


if __name__ == '__main__':
    app.run(debug=True)
