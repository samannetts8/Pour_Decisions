from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import database_name, database_password, database_username
import psycopg2

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{database_username}:{database_password}@localhost/{database_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

