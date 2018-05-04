# app/__init__.py
from flask import Flask
from flask_bootstrap import Bootstrap

# Initialize the app
app = Flask(__name__)
Bootstrap(app)

# Load the views
from app import views

# Load the config file
from config import Config
app.config.from_object(Config)

