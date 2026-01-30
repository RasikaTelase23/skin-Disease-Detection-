
import os
import sys
import traceback

# Add project root to path
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(ROOT_DIR)
sys.path.append(PROJECT_DIR)

from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import config

app = Flask(__name__, template_folder='templates', static_folder='static')

# ------------------------
# CORS (for fetch safety)
# ------------------------
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    return response

# ------------------------
# Upload settings
# ------------------------
UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

predictor = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def init_predictor():
    global predictor
    if predictor is None:
        try:
            print("🔄 Loading model...")
            from src.predict import SkinDiseasePredictor
            predictor = SkinDiseasePredictor()
            print("✅ Model loaded successfully!")
        except Exception as e:
            print("❌ Model loading failed:\n", traceback.format_exc())
            return False
    return True

# ------------------------
# Routes
# ------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():

    if request.method == 'OPTIONS':
        return '', 200

    try:
        print("📨 Request received")

        if 'image' not in request.files:
            return jsonify({'error': 'No image field found'}), 400

        file = request.files['image']

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        if not init_predictor():
            return jsonify({'error': 'Model failed to load'}), 500

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        print("🤖 Predicting...")
        results = predictor.predict(filepath, top_k=3)

        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            'success': True,
            'predictions': results
        })

    except Exception as e:
        print("❌ Prediction error:\n", traceback.format_exc())
        return jsonify({'error': 'Prediction failed. Check server terminal.'}), 500


@app.route('/health')
def health():
    return jsonify({
        'status': 'running',
        'model_loaded': predictor is not None
    })

# ------------------------
# Run server
# ------------------------
if __name__ == '__main__':
    print("=" * 60)
    print("🩺 SKIN DISEASE DETECTOR SERVER STARTED")
    print("🌐 http://127.0.0.1:5000")
    print("=" * 60)
    app.run(debug=True, host='127.0.0.1', port=5000)
