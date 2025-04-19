from flask import Blueprint, request, jsonify
from database.models.database import users_collection
from flask_jwt_extended import create_access_token
from database.utils.password_util import compare_password
from database.utils.logger import get_logger

auth_bp = Blueprint('auth', __name__)
logger = get_logger(__name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    logger.info("Received %s request to /api/login", request.method)

    try:
        data = request.get_json()
        logger.debug("Login attempt with email: %s", data.get('email'))
        
        if 'email' not in data or 'password' not in data:
            logger.warning("Login attempt missing required fields")
            return jsonify({"error": "Email and password are required"}), 400
        
        user = users_collection.find_one({"email": data['email']})
        if not user:
            logger.warning("Login attempt failed: Email not found - %s", data['email'])
            return jsonify({"error": "Invalid email or password"}), 401
        if not compare_password(data['password'], user['password']):
            logger.warning("Login attempt failed due to incorrect password")
            return jsonify({"error": "Invalid password"}), 401
        
        logger.info("User logged in successfully: %s", data['email'])
        logger.debug("User data: %s", {
            "name": user.get("name"),
            "email": user.get("email"),
            "username": user.get("username")
        })

        # Create identity for JWT
        identity = {
            "sub": str(user["_id"]),
            "email": user["email"],
            "name": user["name"],
            "username": user["username"]
        }
        
        # Create access token with the identity
        access_token = create_access_token(identity=identity)
        
        response = jsonify({
            "message": "Login successful",
            "user": {
                "_id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "username": user["username"]
            },
            "access_token": access_token
        })
        return response
    except Exception as e:
        logger.error('Login error: %s', str(e))
        response = jsonify({"error": "An error occurred during login"})
        return response, 500