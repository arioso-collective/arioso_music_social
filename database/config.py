import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
   SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
   JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
   JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24) 
   JWT_BLACKLIST_ENABLED = True
   JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']