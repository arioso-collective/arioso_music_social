from flask import Blueprint, request, jsonify
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models.database import posts_collection, users_collection
from datetime import datetime

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/posts/create', methods=['POST'])
@jwt_required()
def create_post():
    try:
        user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()
        post_data = {
            "username": user["username"],
            "userID": str(user["_id"]),
            "caption": data.get("caption"),
            "createdAt": datetime.now(),
            "likes": 0,
            "url": data.get("url", ""),
            "musicID": data.get("musicID", "")
        }

        result = posts_collection.insert_one(post_data)
        post_id = result.inserted_id

        # Create minimal post object to embed in user's profile
        user_post_entry = {
            "postId": str(post_id),
            "content": data.get("caption", ""),
            "createdAt": post_data["createdAt"]
        }

        users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$push': {'posts': user_post_entry}}
        )

        return jsonify({
            "message": "Post created and linked to user successfully.",
            "post_id": str(post_id)
        }), 201

    except Exception as e:
        return jsonify({"error": f"Error occurred: {str(e)}"}), 500
    
@posts_bp.route('/profile/<username>/posts', methods=['GET'])
@jwt_required()
def get_user_posts(username):
    user = users_collection.find_one({'username': username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    post_ids = [ObjectId(post["postId"]) for post in user.get("posts", []) if post.get("postId")]

    posts = list(posts_collection.find({"_id": {"$in": post_ids}}))
    for post in posts:
        post["_id"] = str(post["_id"])
    return jsonify(posts), 200

    
@posts_bp.route('/get_post/<url>', methods=['GET'])
def get_post(url):
    post = posts_collection.find_one({'url': url})
    if post:
        post['_id'] = str(post['_id'])
        return jsonify(post), 200
    return jsonify({"error": "Post not found"}), 404

@posts_bp.route('/update_post/<post_id>', methods=['PUT'])
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

@posts_bp.route('/delete_post/<post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    result = posts_collection.delete_one({'_id': ObjectId(post_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"message": "Post deleted successfully"}), 200

@posts_bp.route('/like_post/<post_id>', methods=['POST'])
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

@posts_bp.route('/unlike_post/<post_id>', methods=['POST'])
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