from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os


load_dotenv()

# Create an instance of SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configure the app
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') # Ensure database_url is in .env file 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the SQLAlchemy instance with the app
    db.init_app(app)

    # import routes and create_routes function
    from . import routes
    from .routes import create_routes

    # Register routes
    with app.app_context():
        create_routes(app)

    return app
