from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import psycopg2
import os
import uuid
import csv

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

def load_csv_to_db(csv_file_path):
    with open(csv_file_path, newline='', encoding='latin1') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            wine = Wine(
                brand=row['brand'],
                vineyard=row['vineyard'],
                year=row['year'],
                value=row['value'],
                average_rating=float(row['average_rating']),
                price=row['price']
            )
            db.session.add(wine)
        db.session.commit()





@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    # app.run(debug=True)
     with app.app_context():
        load_csv_to_db('../data/vivino_database.csv')