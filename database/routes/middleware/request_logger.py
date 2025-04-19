from flask import request
from database.utils.logger import get_logger

logger = get_logger(__name__)

def register_request_logger(app):
    @app.before_request
    def log_request_info():
        logger.debug('--- Incoming Request ---')
        logger.debug('Method: %s', request.method)
        logger.debug('URL: %s', request.url)
        logger.debug('Headers: %s', dict(request.headers))
        logger.debug('Body: %s', request.get_data(as_text=True))