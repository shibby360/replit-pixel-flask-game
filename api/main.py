#2021 ish
from flask import Flask, render_template, request 
import os, urllib
import helps
try:
  import shdwdb
except:
  os.system('pip install shdwdb')
  import shdwdb
os.system('clear')
app = Flask('app')
db = shdwdb.retrieve('Stats', 'stats.json')
db.def_val = 0
db.kts = 'stats.json'
db.autosave = True
print(db)
def filrou(name):
  exec(f'''@app.route('/' + '{name}')
def {name}():
  return render_template('{name}'+'.html')''')
def purge():
  for i in db.data.value.copy():
    data = db.data[i]
    if data['coins'] == 0 and data['XP'] == 0 and data['Level'] == 1 and data['Health'] == 100 and data['inventory'].value == [] and data['armor'] == 'None' and data['sword'] == 'None' and data['diamonds'] == 0 and data['announcements'].value == []:
      if input('delete ' + i) == 'yes':
        db.delete_column(i)

@app.route('/')
def hello_world():
  return render_template('index.html')

filrou('battle')

@app.route('/createprofile')
def createprofile():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  if form == {}:
    return render_template('makeprof.html')
  else:
    if form['name'] not in db.data:
      db.add_column(form['name'])
      db.set(form['name'], 'password', form['pwd'])
      db.set(form['name'], 'inventory', [])
      db.set(form['name'], 'announcements', [])
      db.set(form['name'], 'Level', 1)
      db.set(form['name'], 'Health', 100)
      db.set(form['name'], 'armor', 'None')
      db.set(form['name'], 'sword', 'None')
      thedb = dict(db.get_column(form['name']))
      thedb['name'] = form['name']
      thedb['inventory'] = list(thedb['inventory'])
      thedb['announcements'] = list(thedb['announcements'])
      return thedb
    else:
      return 'User already present'

@app.route('/login')
def login():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  if form == {}:
    return render_template('login.html')
  else:
    if form['name'] not in db.data:
      return 'User not found'
    elif form['pwd'] != db.get_value(form['name'], 'password'):
      return 'Invalid auth'
    else:
      thedb = dict(db.get_column(form['name']))
      thedb['name'] = form['name']
      thedb['inventory'] = list(thedb['inventory'])
      thedb['announcements'] = list(thedb['announcements'])
      return thedb

@app.route('/save')
def save():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  if 'dialos' in form:
    if int(form['dialos']) > db.get_value(form['name'], 'diamonds'):
      return 'Not enough diamonds'
    db.set(form['name'], 'diamonds', db.get_value(form['name'], 'diamonds')-int(form['dialos']))
  for i in ['coins', 'XP', 'Level', 'Health']:
    db.set(form['name'], i, int(form[i]))
  db.set(form['name'], 'inventory', form['inventory'].split(','))
  db.set(form['name'], 'armor', form['armor'])
  db.set(form['name'], 'sword', form['sword'])
  thedb = dict(db.get_column(form['name']))
  thedb['name'] = form['name']
  thedb['inventory'] = list(thedb['inventory'])
  thedb['announcements'] = list(thedb['announcements'])
  return thedb

@app.route('/users/<user>')
def users(user):
  return render_template('user.html', username=user)

@app.route('/battle/ocean')
def battle_ocean():
  return render_template('battle_ocean.html')

@app.route('/help/<category>/<object>')
def helpr(category, object):
  return render_template('helpr.html', body=helps.helps[category][object], thing=object)

@app.route('/grab')
def grab():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  thedb = dict(db.get_column(form['name']))
  thedb['name'] = form['name']
  thedb['inventory'] = list(thedb['inventory'])
  thedb['announcements'] = list(thedb['announcements'])
  return thedb

@app.route('/error')
def error():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  x = open('errorrpts.txt', 'a')
  x.write(form['name'] + ' said ' + form['rpt'])
  x.close()
  return ''

@app.route('/ancfns')
def ancfns():
  if request.method == 'GET':
    if str(request.query_string)[2:-1] != '':
      query_string = str(request.query_string)[2:-1].split('&')
      for i in range(0, len(query_string)):
        query_string[i] = query_string[i].split('=')
      form = dict(query_string)
      for i in form:
        form[i] = urllib.parse.unquote(form[i]).replace('+', ' ')
    else:
      form = {}
  db.set(form['name'], 'announcements', [])
  thedb = dict(db.get_column(form['name']))
  thedb['name'] = form['name']
  thedb['inventory'] = list(thedb['inventory'])
  thedb['announcements'] = list(thedb['announcements'])
  return thedb

filrou('tutorial')
if __name__ == '__main__':
    app.run()
#87 lines of CSS
#191 lines of python
#1539 lines of JS
#161 lines of HTML