from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv('../env_docs/info.env') 
database_username = os.getenv('database_username')
database_password = os.getenv('database_password')
database_name = os.getenv('database_name')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{database_username}:{database_password}@localhost/{database_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)