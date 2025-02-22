import os
import openai
import re
import re #regular expressions module
from markupsafe import escape #protects projects against injection attacks
from intro_to_flask import app
import sys 
sys.dont_write_bytecode = True
from flask import render_template, request, Flask,Blueprint
from flask import render_template, request, redirect, url_for
from flask_mail import Message, Mail
from .contact_form import ContactForm
from .about_python.about_route import about_blueprint
from better_profanity import profanity 



#The mail_user_name and mail_app_password values are in the .env file
#Google requires an App Password as of May, 2022: 
#https://support.google.com/accounts/answer/6010255?hl=en&visit_id=637896899107643254-869975220&p=less-secure-apps&rd=1#zippy=%2Cuse-an-app-password

mail_user_name = os.getenv('GMAIL_USER_NAME')
mail_app_password = os.getenv('GMAIL_APP_PASSWORD')
openai.api_key = os.getenv('OPENAI_API_KEY')

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = mail_user_name
app.config['MAIL_PASSWORD'] = mail_app_password
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

comments = []

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
  # Flask 2.2.2 requires a parameter to a form object: request.form or other
	# See https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request
  form = ContactForm(request.form) 

  if request.method == 'POST':
      if form.validate() == False:
        return render_template('contact.html', form=form)
      else:
        msg = Message(form.subject.data, sender=mail_user_name, recipients=[form.email.data])
        msg.body = """From: %s <%s> \n%s \n%s
        """ % (form.name.data, form.email.data, form.subject.data, form.message.data)
        mail.send(msg)

        return render_template('contact.html', success=True)

  elif request.method == 'GET':
      return render_template('contact.html', form=form)
  
def custom_censor(text):
    words = text.split()
    censored_words = []
    
    for word in words:
        if profanity.contains_profanity(word):
            if len(word) > 2:
                censored_word = word[0] + ' * ' * (len(word) - 2) + word[-1]  # Keep first and last letter
            else:
                censored_word = ' * ' * len(word)  # Censor short words fully
            censored_words.append(censored_word)
        else:
            censored_words.append(word)

    return ' '.join(censored_words)
  
@app.route('/comments', methods=['GET', 'POST'])
def comments_page():
    if request.method == 'POST':
        name = request.form.get('name')
        text = request.form.get('comment')

        if name and text:  # Basic validation
          filtered_text = custom_censor(text)
          comments.append({
                'author': name,
                'text': filtered_text ,
            })

        return redirect(url_for('comments_page'))  # Redirect to refresh page

    return render_template('comments.html', comments=comments)

       
app.register_blueprint(about_blueprint) 


  
