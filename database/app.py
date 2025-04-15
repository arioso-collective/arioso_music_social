from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, PyMongoError, DuplicateKeyError
from flask import Flask, request, jsonify, render_template, url_for, redirect
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from bson import ObjectId, Binary
from flask_cors import CORS
from urllib.parse import quote_plus
from password_util import hash_password, compare_password
from datetime import datetime, timedelta
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
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.getenv("JWT_SECRET_KEY", "your-secret-key")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# Configure CORS
CORS(app, 
     origins=["http://localhost:5173"],
     supports_credentials=True)

load_dotenv()
encoded_username = quote_plus(os.getenv("MONGO_USERNAME"))
encoded_password = quote_plus(os.getenv("MONGO_PASSWORD"))

MONGO_CONNECTION_STRING = f"mongodb+srv://{encoded_username}:{encoded_password}@arioso.8hh3i.mongodb.net/?retryWrites=true&w=majority&appName=arioso"

#try:
mongo_client = MongoClient(MONGO_CONNECTION_STRING, serverSelectionTimeoutMS=5000)

db = mongo_client['arioso']
users_collection = db['users']
posts_collection = db['posts']
comments_collection = db['comments']

# Verify connection and collection
try:
    # Test the connection
    mongo_client.server_info()
    logger.info("Successfully connected to MongoDB")
    
    # Test the collection
    collection_info = db.command("listCollections")
    logger.info("Available collections: %s", collection_info)
    
    # Test the schema
    collection_schema = db.command("listCollections", filter={"name": "users"})
    logger.info("Users collection schema: %s", collection_schema)
except Exception as e:
    logger.error("MongoDB connection error: %s", str(e))

@app.before_request
def log_request_info():
    logger.debug('Headers: %s', request.headers)
    logger.debug('Body: %s', request.get_data())
    logger.debug('Method: %s', request.method)
    logger.debug('URL: %s', request.url)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test endpoint working!"}), 200

@app.route('/api/create_user', methods=['POST'])
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
    
@app.route('/api/update_profile', methods=['PUT'])
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
        
        

@app.route('/api/get_users', methods=['GET'])
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

@app.route('/api/get_user/<username>', methods=['GET'])
@jwt_required()
def get_user(username):
    user = users_collection.find_one({'username': username})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@app.route('/api/update_post/<post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    data = request.get_json()
    update_fields = {}

    if 'title' in data:
        update_fields['title'] = data['title']
    if 'content' in data:
        update_fields['content'] = data['content']
    
    if not update_fields:
        return jsonify({"error": "No fields to update"}), 400

    result = posts_collection.update_one(
        {'_id': ObjectId(post_id)},
        {'$set': update_fields}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Post not found"}), 404

    return jsonify({"message": "Post updated successfully"}), 200

@app.route('/api/update_comment/<comment_id>', methods=['PUT'])
@jwt_required()
def update_comment(comment_id):
    data = request.get_json()
    update_fields = {}
    if 'text' in data:
        update_fields['text'] = data['text']
    if not update_fields:
        return jsonify({"error": "No fields to update"}), 400
    result = comments_collection.update_one(
        {'_id': ObjectId(comment_id)},
        {'$set': update_fields}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Comment not found"}), 404
    return jsonify({"message": "Comment updated successfully"}), 200

@app.route('/api/update_user/<user_id>', methods=['PUT'])
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
    
@app.route('/api/like_post/<post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    post = posts_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"error": "Post not found"}), 404
    if 'liked_by' in post and user_id in post['liked_by']:
        return jsonify({"error": "User already liked this post"}), 400
    result = posts_collection.update_one(
        {"_id": ObjectId(post_id)},
        {
            "$inc": {"likes": 1},
            "$addToSet": {"liked_by": user_id}
        }
    )
    return jsonify({"message": "Post liked successfully"}), 200

@app.route('/api/delete_post/<post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    result = posts_collection.delete_one({'_id': ObjectId(post_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"message": "Post deleted successfully"}), 200

@app.route('/api/delete_comment/<comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    result = comments_collection.delete_one({'_id': ObjectId(comment_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Comment not found"}), 404
    return jsonify({"message": "Comment deleted successfully"}), 200

@app.route('/api/delete_user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    result = users_collection.delete_one({'_id': ObjectId(user_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/api/unlike_post/<post_id>', methods=['POST'])
@jwt_required()
def unlike_post(post_id):
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    post = posts_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"error": "Post not found"}), 404
    if 'likedBy' not in post or user_id not in post['likedBy']:
        return jsonify({"error": "User has not liked this post"}), 400
    result = posts_collection.update_one(
        {"_id": ObjectId(post_id)},
        {
            "$inc": {"likes": -1},
            "$pull": {"likedBy": user_id}
        }
    )
    return jsonify({"message": "Post unliked successfully"}), 200

@app.route('/api/login', methods=['POST'])
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

if __name__ == "__main__":
    app.run(debug=True, port=5001)