from flask import jsonify,abort
from data.db import db
import uuid
import csv

#Create the class for the Wine model
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

#Return all function
def return_all_wines():
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


#Return wine with id function
def return_wine_with_id(id):
    wine = Wine.query.get(id)
    if wine is None:
        abort(404)
    return jsonify(wine)