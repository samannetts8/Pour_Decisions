from data.db import app
from blueprints.api_routes.wine_database import wine_database

# Register blueprints
app.register_blueprint(wine_database, url_prefix='/wine')

if __name__ == '__main__':
    app.run(debug=True)