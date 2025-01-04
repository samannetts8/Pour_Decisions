import csv

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
