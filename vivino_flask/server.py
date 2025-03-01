from flask import Flask, jsonify, request
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

# Allow requests from all origins (for development only)
CORS(app)

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

# @app.route('/image', methods=['POST'])
# def analyse_image():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No file part'}), 400
    
#     file = request.files['image']
#     field = request.files['field']
#     wine_database = supabase.table('Vivino_data').select('*').execute().data
    
#     if file.filename == '':
#         return jsonify({'error': 'Image cannot be read'}), 400
        
#     if file and allowed_file(file.filename):
#         try:
#             image_text = process_image(file)
#             image_text_array = image_to_text_array(image_text)
#             if field == "vineyard" or field == "brand":
#                 potential_matches = filter_wines(wine_database,image_text_array,field)
#                 return jsonify(potential_matches)
#             else:
#                 potential_vineyards, potential_brands = filter_wines(wine_database,image_text_array,"both")
#                 return jsonify(potential_vineyards, potential_brands)
#         except Exception as e:
#             return jsonify({'error': str(e)}), 500
    
#     return jsonify({'error': 'Invalid file type'}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)