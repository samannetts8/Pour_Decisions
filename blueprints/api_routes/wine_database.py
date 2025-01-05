from flask import Blueprint
from blueprints.api_models import return_all_wines, return_wine_with_id

wine_database = Blueprint('wine_database', __name__)

@wine_database.route('/')
def home():
    return return_all_wines()

@wine_database.route('/<string:id>', methods=['GET'])
def wine_id_search(id):
    return return_wine_with_id(id)
