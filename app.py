from flask import Flask
from database.config import Config
from database.extensions import jwt, cors
from database.routes import register_routes
from database.routes.middleware.request_logger import register_request_logger
from database.models.database import test_mongo_connection

import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register extensions
    jwt.init_app(app)
    cors.init_app(app)

    # Register routes
    register_routes(app)

    # Register middleware
    register_request_logger(app)

    # Test DB connection
    test_mongo_connection()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)
