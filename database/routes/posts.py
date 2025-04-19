from flask import Blueprint, request, jsonify
from bson import ObjectId
from flask_jwt_extended import jwt_required
from models.database import posts_collection

posts_bp = Blueprint('posts', __name__)

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

@posts_bp.route('/api/like_post/<post_id>', methods=['POST'])
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

@posts_bp.route('/api/delete_post/<post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    result = posts_collection.delete_one({'_id': ObjectId(post_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"message": "Post deleted successfully"}), 200

@posts_bp.route('/api/unlike_post/<post_id>', methods=['POST'])
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