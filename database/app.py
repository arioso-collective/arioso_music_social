from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from flask import Flask, request, jsonify, render_template, url_for, redirect
from bson.objectid import ObjectId
from flask_cors import CORS
from urllib.parse import quote_plus

app = Flask(__name__)
cors = CORS(app)

username = "xkx6"
password = "@ri0s0"
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

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

@app.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    if 'name' not in data or 'email' not in data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "All fields are required"}), 400
    
    user = {
        "name": data['name'],
        "email": data['email'],
        "username": data['username'],
        "password": data['password']
    }
    result = users_collection.insert_one(user)
    user['_id'] = str(result.inserted_id)
    return redirect(url_for('home'))

@app.route('/read', methods=['GET'])
def get_users():
    users = list(users_collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users), 200

@app.route('/profile/<username>', methods=['GET'])
def get_user(username):
    user = users_collection.find_one({'_id': ObjectId(username)})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


    

if __name__ == "__main__":
    app.run(debug=True)