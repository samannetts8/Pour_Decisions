from flask import Blueprint, render_template,jsonify
from blueprints.api_models import return_all_wines, return_wine_with_id

wine_database = Blueprint('wine_database', __name__)

@wine_database.route('/', methods=['GET'])
def home():
    wine_list = return_all_wines()
    target_wine = None
    return render_template('wine_table.html', wine_list=wine_list, target_wine=target_wine)  

@wine_database.route('/<string:id>', methods=['GET'])
def wine_id_search(id):
    target_wine = return_wine_with_id(id)
    return render_template('wine_table.html', target_wine=target_wine)  