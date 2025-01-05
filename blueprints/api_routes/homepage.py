from flask import Blueprint, render_template

homepage = Blueprint('homepage', __name__, template_folder='../static/templates')

@homepage.route('/')
def home():
    return render_template('index.html')