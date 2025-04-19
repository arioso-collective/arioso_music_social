from flask import Flask
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt
from database.config import Config
from database.extensions import jwt, cors
from database.routes import register_routes
from database.routes.middleware.request_logger import register_request_logger
from database.models.database import test_mongo_connection, blacklist_tokens_collection
from datetime import datetime

import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register extensions
    jwt.init_app(app)
    cors.init_app(app)

    # Check for blacklisted token
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        blacklisted = blacklist_tokens_collection.find_one({"jti": jti})
        return blacklisted is not None

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
