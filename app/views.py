import matplotlib
matplotlib.use('Agg')
from flask import render_template, request, jsonify
from sunpy.net import Fido, attrs as a
import matplotlib.pyplot as plt
import glob
import os



import sunpy.map
import sunpy.data.sample
import astropy.units as u
import io
import urllib
from PIL import Image

from app import app


@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/AIA/', methods=['POST'])
def AIA():
    result = Fido.search(a.Time(request.form.get('startdate'), request.form.get('enddate'),
                                request.form.get('enddate')), a.Instrument('aia'), a.vso.Wavelength(304*u.AA))
    downloaded_files = Fido.fetch(result[0, 0], path='app/static/fits/{file}.fits')
    lyra_map = sunpy.map.Map(downloaded_files)
    lyra_map.peek(basic_plot=True)
    plt.savefig('app/static/AIA_image_clean.png')
    map = {'map_data': downloaded_files}
    map = jsonify(map)
    return map

@app.route('/plot_info/', methods=['POST'])
def plot_info():
    list_of_files = glob.glob('app/static/fits/*')
    latest_file = max(list_of_files, key=os.path.getctime)
    lyra_map = sunpy.map.Map(latest_file)
    lyra_map.peek()
    plt.savefig('app/static/AIA_info.png')
    return 'done'



