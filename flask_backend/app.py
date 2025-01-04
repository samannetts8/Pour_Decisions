from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import psycopg2
import os
import uuid


load_dotenv('../env_docs/info.env') 
app = Flask(__name__)

database_username = os.getenv('database_username')
database_password = os.getenv('database_password')
database_name = os.getenv('database_name')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{database_username}:{database_password}@localhost/{database_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Wine(db.Model):
    __tablename__ = 'full_wine_list'    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    brand = db.Column(db.String, nullable=False)
    vineyard = db.Column(db.String, nullable=False)
    year = db.Column(db.String, nullable=False, default='Unknown Year')
    value = db.Column(db.String, nullable=False)
    average_rating = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Wine {self.id}>'

migrate=Migrate(app, db)

@app.route('/')
def home():
    wines = Wine.query.all()
    wines_list = [
    {
        'id': wine.id,
        'brand': wine.brand,
        'vineyard': wine.vineyard,
        'year': wine.year,
        'value': wine.value,
        'average_rating': wine.average_rating,
        'price': wine.price
    } for wine in wines
    ]
    return jsonify(wines_list)

@app.route('/wine/<string:id>',methods=['GET'])
def get_wine_with_id(id):
    wine = Wine.query.get(id)
    wine_card = [
    {
        'id': wine.id,
        'brand': wine.brand,
        'vineyard': wine.vineyard,
        'year': wine.year,
        'value': wine.value,
        'average_rating': wine.average_rating,
        'price': wine.price
    }
    ]
    return jsonify(wine_card)


if __name__ == '__main__':
    app.run(debug=True)
