import matplotlib
matplotlib.use('Agg')
from sunpy.net import Fido, attrs as a
import os
import sunpy.map
import sunpy.data.sample
import astropy.units as u

result = Fido.search(a.Time('2012/3/4', '2012/3/6'), a.Instrument('eit'))
downloaded_files = Fido.fetch(result[0, 0], path='static/fits/{file}.fits')
lyra_map = sunpy.map.Map(downloaded_files)
filename = (os.path.basename(downloaded_files[0]))
lyra_map.peek(basic_plot=True)