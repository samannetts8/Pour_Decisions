from flask import Blueprint, render_template,jsonify
from blueprints.api_models import return_all_wines, return_wine_with_id

wine_database = Blueprint('wine_database', __name__)

@wine_database.route('/', methods=['GET'])
def home():
    wine_list = return_all_wines()
    obj_type = type(wine_list)
    length = len(wine_list) 
    return render_template('full_wine_table.html', wine_list=wine_list,length = length, obj_type = obj_type)  

@wine_database.route('/<string:id>', methods=['GET'])
def wine_id_search(id):
    return return_wine_with_id(id)