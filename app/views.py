from StringIO import StringIO
import urllib
from PIL import Image

from flask import render_template

from app import app


@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
     file = StringIO(urllib.urlopen('https://api.helioviewer.org/v2/getJP2Image/?date=2014-01-01T23:59:59Z&sourceId=14')
    #                 .read())
    # img = Image.open(file)
    # rgb_im = img.convert('RGB')
    # rgb_im.save('app/static/colors.png', optimize=True, quality=20)
    return render_template('index.html')

