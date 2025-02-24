from flask import Flask,jsonify;
from flask_cors import CORS;
from dotenv import load_dotenv
from supabase import create_client, Client
import asyncio
import os

load_dotenv()

supabase_url = os.getenv('supabase_url')
supabase_key = os.getenv('supabase_key')
supabase = create_client(supabase_url,supabase_key)

app = Flask(__name__)
CORS(app)

@app.route("/")
def members():
    data = supabase.table('Vivino_data').select('*').execute()
    return jsonify(data.data)  

if __name__ == "__main__":
        app.run(debug=True)

