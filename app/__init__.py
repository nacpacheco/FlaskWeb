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

# Function to get image
def get_image():
    #file = StringIO(
        #urllib.urlopen('https://api.helioviewer.org/v2/getJP2Image/?date=' + datetime + 'Z&sourceId=' + sourceid)
        #.read())
    #file = StringIO(urllib.urlopen('https://api.helioviewer.org/v2/getJP2Image/?date=2014-01-01T23:59:59Z&sourceId=14')
                     #.read())
    # img = Image.open(file)
    # rgb_im = img.convert('RGB')
    # rgb_im.save('app/static/colors.png', optimize=True, quality=20)
    return '/static/colors.png'
app.jinja_env.globals.update(get_image=get_image)
