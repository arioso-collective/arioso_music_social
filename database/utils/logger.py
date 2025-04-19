from dotenv import load_dotenv
import os
import logging

# Set up logging based on environment
load_dotenv()
env = os.getenv('FLASK_ENV', 'production')

logging.basicConfig(
    level=logging.DEBUG if env == 'development' else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
