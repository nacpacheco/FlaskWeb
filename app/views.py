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
from datetime import datetime, timedelta
from PIL import Image


from app import app

image_path = ''
@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html', img='')

@app.route('/AIA/', methods=['GET','POST'])
def AIA():
    startDate = request.args.get('a', 0, type=str)
    endDate = request.args.get('b', 0, type=str)
    wave = request.args.get('c', 0, type=int)
    print(wave)
    result = Fido.search(a.Time(startDate, endDate, endDate), a.Instrument('aia'),
                         a.vso.Wavelength(wave*u.angstrom))
    downloaded_files = Fido.fetch(result[0, 0], path='app/static/fits/{file}.fits')
    lyra_map = sunpy.map.Map(downloaded_files)
    filename = (os.path.basename(downloaded_files[0]))
    lyra_map.peek(basic_plot=True)
    plt.savefig('app/static/'+filename+'_image.png')
    image_path = 'static/'+filename+'_image.png'
    # img = Image.open('static/'+filename+'_image.png')
    # img = img.crop(())
    return jsonify(result='<img id="img" src="'+image_path+'" style="width: inherit; padding-bottom: 6px;"><button id="plot_info" ' \
                                            'class="btn btn-default" onClick="plot_info()" ' \
                                            'style="width: 77px; margin-top: 10px;">Plot Info</button>')

@app.route('/EIT/', methods=['POST'])
def EIT():
    enddate = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    startdate = (datetime.now() - timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M:%S')
    result = Fido.search(a.Time('2012/3/4', '2012/3/6'), a.Instrument('eit'),
                         a.vso.Wavelength(171*u.angstrom))
    downloaded_files = Fido.fetch(result[0, 0], path='app/static/fits/{file}.fits')
    lyra_map = sunpy.map.Map(downloaded_files)
    filename = (os.path.basename(downloaded_files[0]))
    lyra_map.peek(basic_plot=True)
    plt.savefig('app/static/'+filename+'_image.png')
    image_path = 'static/'+filename+'_image.png'
    #img = Image.open('static/'+filename+'_image.png')
    #img = img.crop(())
    return '<img id="img" src="'+image_path+'" style="width: inherit; padding-bottom: 6px;"><button id="plot_info" class' \
                                            '="btn btn-default" ' \
                                            'onClick="plot_info()" style="width: 77px; margin-top: 10px;">Plot Info</button>'

@app.route('/plot_info/', methods=['POST'])
def plot_info():
    list_of_files = glob.glob('app/static/fits/*')
    latest_file = max(list_of_files, key=os.path.getctime)
    lyra_map = sunpy.map.Map(latest_file)
    filename = (os.path.basename(latest_file))
    lyra_map.peek()
    plt.savefig('app/static/'+filename+'_info.png')
    return '<img id="img" src="static/'+filename+'_info.png" style="width: inherit; padding-bottom: 6px;">'



