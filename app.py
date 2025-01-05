from data.db import app
from blueprints.api_routes.wine_database_search import wine_database
from blueprints.api_routes.homepage import homepage

# Register blueprints
app.register_blueprint(wine_database, url_prefix='/wine')
app.register_blueprint(homepage)

if __name__ == '__main__':
    app.run(debug=True)
