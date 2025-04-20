from flask import Blueprint, request, jsonify
from database.models.database import users_collection, blacklist_tokens_collection
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from database.utils.password_util import compare_password
from database.utils.logger import get_logger
from datetime import datetime

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
        identity = str(user["_id"])
        
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
    
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        jti = get_jwt()['jti']
        logger.info(f"Attempting to blacklist token with jti: {jti}")
        
        if not jti:
            logger.error("Logout failed: Missing 'jti' in JWT")
            return jsonify({"error": "Missing jti"}), 400
        
        if blacklist_tokens_collection.find_one({"jti": jti}):
            logger.info("Token already blacklisted")
            return jsonify({"message": "Token already blacklisted"}), 200
        
        blacklist_tokens_collection.insert_one({
            "jti": str(jti),
            "createdAt": datetime.now()
        })
        logger.info("Token successfully blacklisted")
        return jsonify({"message": "Successfully logged out"}), 200
    
    except Exception as e:
        logger.error('Logout error: %s', str(e))
        response = jsonify({"error": "An error occurred during logout"})
        return response, 500