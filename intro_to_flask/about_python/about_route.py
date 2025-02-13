import os
import openai
import re #regular expressions module
from markupsafe import escape #protects projects against injection attacks
from intro_to_flask import app
import sys 
sys.dont_write_bytecode = True
from flask import render_template, request, Flask, Blueprint

about_blueprint = Blueprint('about', __name__)

@about_blueprint.route('/about',methods=['GET', 'POST'])
@app.route('/about',defaults={'route_with_name': None})
@app.route('/about/<route_with_name>')
def about(route_with_name):
  # Set default about me message and team member names.
  about_me = 'I like CS3398 allot!!!!!!!'
  team_names = ["Mike", "Sally", "Tom"]
  cleaned_name = ''

  # if a name was included in route, check to see if it uses (only) English alphabet characters.
  # This uses escape to 'sanitize' the route_with_name to remove characters that might cause a 
  # 'script injection attack':
  # https://www.stackhawk.com/blog/command-injection-python/
  # https://security.openstack.org/guidelines/dg_cross-site-scripting-xss.html
  # https://cwe.mitre.org/data/definitions/95.html
  if route_with_name:
    is_english_aphabetic = re.match("[a-zA-Z]+", escape(route_with_name))
     # If an English alpabet name, get it.
     # We are not reporting an error if the route_with_name is not English alphabetic 
    if is_english_aphabetic:                       
      cleaned_name = is_english_aphabetic.group(0)
    
    if cleaned_name in team_names:                  
      return render_template('about.html', about_name=cleaned_name, about_aboutMe=about_me, team_names=team_names)
    else:
      cleaned_name = "Us"
  else:
    cleaned_name = "Us"
  return render_template('about.html', about_name=cleaned_name, about_aboutMe="We like CS3398 allot!!!!", team_names=team_names)
