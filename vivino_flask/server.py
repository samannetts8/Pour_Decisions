from flask import Flask, jsonify, request, current_app
import logging
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
from image_processing import process_image, image_to_text_array,filter_wines
import os

load_dotenv()

supabase_url = os.getenv('supabase_url')
supabase_key = os.getenv('supabase_key')
supabase = create_client(supabase_url, supabase_key)

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Allow requests from all origins (for development only)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True,
        "send_wildcard": False
    }
})

# Alternatively, allow requests from a specific origin (e.g., your frontend)
# CORS(app, origins=["http://localhost:3000"])

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # Limits max file size to 10MB 


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def members():
    print("test")
    data = supabase.table('Vivino_data').select('*').execute()
    return jsonify(data.data)

@app.route('/image', methods=['POST'])
def analyse_image():
    logger.info("Request received at /image endpoint")
    logger.info(f"Request method: {request.method}")
    logger.info(f"Request files: {request.files}")
    logger.info(f"Request form: {request.form}")
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    field = request.form['field']
    logger.info(f"field: {field}")
    logger.info(f"file: {file}")
    wine_database = supabase.table('Vivino_data').select('*').execute().data
    if file.filename == '':
        return jsonify({'error': 'Image cannot be read'}), 400
    if file and allowed_file(file.filename):
        try:
            logger.info("Starting image processing...")
            image_text = process_image(file)
            logger.info(f"Process image result: {image_text}")
            
            if not image_text:
                logger.error("No text extracted from image")
                raise ValueError("Failed to process image - no text extracted")
                
            logger.info("Converting text to array...")
            image_text_array = image_to_text_array(image_text)
            logger.info(f"Text array result: {image_text_array}")
            
            if not image_text_array:
                logger.error("Failed to convert text to array")
                raise ValueError("Failed to convert image text to Array")
            
            if field == "vineyard" or field == "brand":
                potential_matches = filter_wines(wine_database,image_text_array,field)
                return jsonify(potential_matches)
            else:
                potential_vineyards, potential_brands = filter_wines(wine_database,image_text_array,"both")
                return jsonify(potential_vineyards, potential_brands)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)