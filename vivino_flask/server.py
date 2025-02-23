from flask import Flask,jsonify;
from dotenv import load_dotenv
from supabase import create_client, Client
import os

load_dotenv()

supabase_url = os.getenv('supabase_url')
supabase_key = os.getenv('supabase_key')
supabase = create_client(supabase_url,supabase_key)
print(f"Supabase client: {supabase}")

app = Flask(__name__)


@app.route("/")
def members():
    # Query data from Supabase
    data = supabase.table('Vivino_data').select('*').execute()
    return jsonify(data.data)  # Return the fetched data as JSON

if __name__ == "__main__":
        app.run(debug=True)

