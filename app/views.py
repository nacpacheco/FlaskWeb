import matplotlib
matplotlib.use('Agg')
from flask import render_template, request, jsonify
from sunpy.net import Fido, attrs as a
import sunpy.timeseries as ts
import matplotlib.pyplot as plt
import os
import sunpy.map
import sunpy.data.sample
import astropy.units as u
from datetime import datetime, timedelta


from app import app

image_path = ''
@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html', img='')

@app.route('/AIA/', methods=['GET','POST'])
def AIA():
    endDate = request.args.get('a', 0, type=str)
    endDate = datetime.strptime(endDate, "%Y/%m/%d %H:%M")
    startDate = endDate - timedelta(minutes=30)
    wave = request.args.get('c', 0, type=int)
    print(startDate)
    result = Fido.search(a.Time(startDate, endDate, endDate), a.Instrument('aia'),
                         a.vso.Wavelength(wave*u.angstrom))
    downloaded_files = Fido.fetch(result[0, 0], path='app/static/fits/{file}.fits')
    filename = (os.path.basename(downloaded_files[0]))
    return jsonify(result=filename)

@app.route('/AIATimeSeries', methods=['GET','POST'])
def AIATimeSeries():
    startDate = request.args.get('a', 0, type=str)
    endDate = request.args.get('b', 0, type=str)
    result = Fido.search(a.Time(startDate, endDate), a.Instrument('XRS'))
    downloaded_files = Fido.fetch(result)
    combined_goes_ts = ts.TimeSeries(downloaded_files, source='XRS', concatenate=True)
    combined_goes_ts.peek()
    filename = (os.path.basename(downloaded_files[0]))
    plt.savefig('app/static/images/' + filename + '_timeseries.png')
    return jsonify(result='<img id="img" src="static/images/'+filename+'_timeseries.png" style="width: inherit; padding-bottom: 6px;">')

@app.route('/plot_info/', methods=['GET', 'POST'])
def plot_info():
    latest_file = 'app/static/fits/' + request.args.get('a', 0, type=str)
    lyra_map = sunpy.map.Map(latest_file)
    filename = (os.path.basename(latest_file))
    lyra_map.peek()
    plt.savefig('app/static/images/'+filename+'_info.png')
    return jsonify(result='<img id="img" src="static/images/'+filename+'_info.png" style="width: inherit; padding-bottom: 6px;">')

@app.route('/plot_image/', methods=['GET', 'POST'])
def plot_image():
    latest_file = 'app/static/fits/' + request.args.get('a', 0, type=str)
    lyra_map = sunpy.map.Map(latest_file)
    filename = (os.path.basename(latest_file))
    lyra_map.peek(basic_plot=True)
    plt.savefig('app/static/images/' + filename + '_image.png')
    return jsonify(result='<img id="img" src="static/images/'+filename+'_image.png" style="width: inherit; padding-bottom: 6px;">')




