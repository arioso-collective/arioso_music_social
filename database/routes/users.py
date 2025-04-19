from flask import Blueprint, request, jsonify
from bson import ObjectId, Binary
from flask_jwt_extended import jwt_required
from models.database import users_collection
from utils.password_util import hash_password
from datetime import datetime
from pymongo.errors import PyMongoError
from database.utils.password_util import hash_password
from datetime import datetime
import logging


users_bp = Blueprint('users', __name__)
logger = logging.getLogger(__name__)

@users_bp.route('/create_user', methods=['POST'])
def create_user():
    logger.info("Received %s request to /api/create_user", request.method)

    try:
        data = request.get_json()
        if 'name' not in data or 'email' not in data or 'username' not in data or 'password' not in data:
            return jsonify({"error": "All fields are required"}), 400
        
        existing_user = users_collection.find_one({"username": data['username']})
        if existing_user:
            logger.warning("Username already exists: %s", data['username'])
            return jsonify({"error": "Username already exists"}), 400
        
        existing_email = users_collection.find_one({"email": data['email']})
        if existing_email:
            logger.warning("Email already exists: %s", data['email'])
            return jsonify({"error": "Email already exists"}), 400
        
        # Create user document
        user = {
            "name": data['name'],
            "email": data['email'],
            "username": data['username'],
            "password": Binary(hash_password(data['password'])),
            "followers": [{"userId": ""}],
            "followerCount": 0,
            "followingCount": 0,
            "profilePicture": Binary(b""),
            "bio": "",
            "musicID": "",
            "posts": [{
                "postId": "",
                "content": "",
                "createdAt": datetime.utcnow()
            }],
            "favGenres": [""],
            "favArtists": [""]
        }
        
        result = users_collection.insert_one(user)
        logger.info("User created successfully: %s", data['username'])
        
        # Create response without Binary fields
        response_user = {
            "_id": str(result.inserted_id),
            "name": user["name"],
            "email": user["email"],
            "username": user["username"],
            "followers": user["followers"],
            "followerCount": user["followerCount"],
            "followingCount": user["followingCount"],
            "bio": user["bio"],
            "musicID": user["musicID"],
            "posts": user["posts"],
            "favGenres": user["favGenres"],
            "favArtists": user["favArtists"]
        }
        
        return jsonify({"message": "User created successfully", "user": response_user}), 201
    except PyMongoError as e:
        logger.error('MongoDB error: %s', str(e))
        return jsonify({"error": f"Database error occurred: {str(e)}"}), 500
    except Exception as e:
        logger.error('Unexpected error: %s', str(e))
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    
@users_bp.route('/api/update_profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    user_id = data.get('_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
        
    try:
        # Check if user exists
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Update user fields
        update_fields = {}
        updatable_fields = ['name', 'email', 'username', 'bio', 'musicID', 'favGenres', 'favArtists']
        
        for field in updatable_fields:
            if field in data:
                # Check for unique constraints
                if field == 'email' and data[field] != user[field]:
                    existing_email = users_collection.find_one({'email': data[field], '_id': {'$ne': ObjectId(user_id)}})
                    if existing_email:
                        return jsonify({"error": "Email already in use"}), 400
                
                if field == 'username' and data[field] != user[field]:
                    existing_username = users_collection.find_one({'username': data[field], '_id': {'$ne': ObjectId(user_id)}})
                    if existing_username:
                        return jsonify({"error": "Username already in use"}), 400
                
                update_fields[field] = data[field]
        
        # Handle password update separately for hashing
        if 'password' in data:
            update_fields['password'] = Binary(hash_password(data['password']))
            
        # Handle profile picture if provided
        if 'profilePicture' in data and data['profilePicture']:
            update_fields['profilePicture'] = Binary(data['profilePicture'].encode())
        
        if not update_fields:
            return jsonify({"error": "No valid fields provided for update"}), 400
            
        # Update the user document
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({"message": "No changes made"}), 200
            
        # Get updated user
        updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
        updated_user['_id'] = str(updated_user['_id'])
        
        # Remove binary fields from response
        if 'password' in updated_user:
            del updated_user['password']
        if 'profilePicture' in updated_user:
            del updated_user['profilePicture']
            
        return jsonify({"message": "Profile updated successfully", "user": updated_user}), 200
    except PyMongoError as e:
        logger.error('MongoDB error: %s', str(e))
        return jsonify({"error": f"Database error occurred: {str(e)}"}), 500
    except Exception as e:
        logger.error('Unexpected error: %s', str(e))
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
        

@users_bp.route('/api/get_users', methods=['GET'])
@jwt_required()
def get_users():
    username = request.args.get('username')
    user_id = request.args.get('_id')  
    if username:
        user = users_collection.find_one({'username': username})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    elif user_id:
        try:
            user = users_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])
                return jsonify(user), 200
            else:
                return jsonify({"error": "User not found"}), 404
        except Exception as e:
            return jsonify({"error": f"Invalid ObjectId format: {str(e)}"}), 400
    else:
        users = list(users_collection.find())
        for user in users:
            user['_id'] = str(user['_id'])
        if not users:
            return jsonify({"error": "No users found"}), 404
        return jsonify(users), 200

@users_bp.route('/api/get_user/<username>', methods=['GET'])
@jwt_required()
def get_user(username):
    user = users_collection.find_one({'username': username})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@users_bp.route('/api/update_user/<user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    update_fields = {}
    if 'name' in data:
        update_fields['name'] = data['name']
    if 'email' in data:
        existing_email = users_collection.find_one({'email': data['email'], '_id': {'$ne': ObjectId(user_id)}})
        if existing_email:
            return jsonify({"error": "Email already in use"}), 400
        update_fields['email'] = data['email']
    if 'username' in data:
        existing_user = users_collection.find_one({'username': data['username'], '_id': {'$ne': ObjectId(user_id)}})
        if existing_user:
            return jsonify({"error": "Username already in use"}), 400
        update_fields['username'] = data['username']
    if 'password' in data:
        update_fields['password'] = Binary(hash_password(data['password']))
    if not update_fields:
        return jsonify({"error": "No valid fields provided for update"}), 400
    result = users_collection.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': update_fields}
    )
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User updated successfully"}), 200

@users_bp.route('/api/delete_user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    result = users_collection.delete_one({'_id': ObjectId(user_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted successfully"}), 200