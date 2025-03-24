from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, PyMongoError, DuplicateKeyError
from flask import Flask, request, jsonify, render_template, url_for, redirect
from bson import ObjectId, Binary
from flask_cors import CORS
from urllib.parse import quote_plus
from password_util import hash_password
from datetime import datetime
from dotenv import load_dotenv
import os

app = Flask(__name__)
cors = CORS(app)

load_dotenv()
encoded_username = quote_plus(os.getenv("MONGO_USERNAME"))
encoded_password = quote_plus(os.getenv("MONGO_PASSWORD"))

MONGO_CONNECTION_STRING = f"mongodb+srv://{encoded_username}:{encoded_password}@arioso.8hh3i.mongodb.net/?retryWrites=true&w=majority&appName=Arioso"

#try:
mongo_client = MongoClient(MONGO_CONNECTION_STRING, serverSelectionTimeoutMS=5000)
#mongo_client.server_info()  # Check if the server is reachable
#print("Connected to MongoDB Server...")

db = mongo_client['Arioso']
users_collection = db['users']
posts_collection = db['posts']
comments_collection = db['comments']

#except ServerSelectionTimeoutError as e:
    #print("Could not connect to the MongoDB server...", e)

@app.route('/api/create_user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        if 'name' not in data or 'email' not in data or 'username' not in data or 'password' not in data:
            return jsonify({"error": "All fields are required"}), 400
        existing_user = users_collection.find_one({"username": data['username']})
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400
        existing_email = users_collection.find_one({"email": data['email']})
        if existing_email:
            return jsonify({"error": "Email already exists"}), 400
        user = {
            "name": data['name'],
            "email": data['email'],
            "username": data['username'],
            "password": Binary(hash_password(data['password']))
        }
        result = users_collection.insert_one(user)
        user['_id'] = str(result.inserted_id)
        return redirect(url_for('signup'))
    except PyMongoError as e:
        return jsonify({"error": f"Database error occurred: {str(e)}"}), 500

@app.route('/api/get_users', methods=['GET'])
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
def get_user(username):
    user = users_collection.find_one({'username': username})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@app.route('/api/update_post/<post_id>', methods=['PUT'])
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




    

if __name__ == "__main__":
    app.run(debug=True)