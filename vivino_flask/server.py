from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
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

@app.route("/")
def members():
    data = supabase.table('Vivino_data').select('*').execute()
    return jsonify(data.data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)