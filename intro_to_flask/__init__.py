import sys 
sys.dont_write_bytecode = True
from flask import Flask


app = Flask(__name__)

app.secret_key = 'development key'
app.config['SECRET_KEY']='LongAndRandomSecretKey'

#mail.init_app(app)
from .routes import mail
