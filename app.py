from data.db import app
from blueprints.api_routes.wine_database_search import wine_database
from blueprints.api_models import load_csv_to_db
import os

# Register blueprints
app.register_blueprint(wine_database, url_prefix='/wine')

if __name__ == '__main__':
    app.run(debug=True)