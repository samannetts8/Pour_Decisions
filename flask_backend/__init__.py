from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv('../env_docs/info.env') 
app = Flask(__name__)

database_username = os.getenv('database_username')
database_password = os.getenv('database_password')
database_name = os.getenv('database_name')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{database_username}:{database_password}@localhost/{database_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Wine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String, nullable=False)
    vineyard = db.Column(db.String, nullable=False)
    year = db.Column(db.String, nullable=False, default='Unknown Year')
    value = db.Column(db.String, nullable=False)
    average_rating = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'









@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)