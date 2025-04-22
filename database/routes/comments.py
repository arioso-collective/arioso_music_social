from flask import Blueprint, request, jsonify
from bson import ObjectId
from flask_jwt_extended import jwt_required
from database.models.database import comments_collection, posts_collection
from datetime import datetime

comments_bp = Blueprint('comments', __name__)

comments_bp.route('/create_comment/<url>', methods=['POST'])
def create_comment(url):
    try:
        data = request.get_json()
        post = posts_collection.find_one({'url': url})
        if not post:
            return jsonify({"error": "Post not found"}), 404
        userID = str(post['userID'])
        comment_data = {
            "url": url,
            "postID": str(post['_id']),
            "userID": userID,
            "comment": data.get('comment'),
            "createdAt": datetime.now(),
        }
        result = comments_collection.insert_one(comment_data)
        return jsonify({
            "message": "Comment created successfully.",
            "comment_id": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({"error": f"Error occurred: {str(e)}"}), 500

@comments_bp.route('/get_comment/<url>', methods=['GET'])
def get_comments(url):
    try:
        comments_cursor = comments_collection.find({'url': url}).sort('createdAt', -1)
        comments = []
        for c in comments_cursor:
            comments.append({
                "_id": str(c["_id"]),
                "comment": c.get("comment"),
                "userID": c.get("userID"),
                "createdAt": c.get("createdAt").isoformat() if c.get("createdAt") else None
            })
        return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": f"Error occurred: {str(e)}"}), 500


@comments_bp.route('/update_comment/<comment_id>', methods=['PUT'])
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

@comments_bp.route('/delete_comment/<comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    result = comments_collection.delete_one({'_id': ObjectId(comment_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Comment not found"}), 404
    return jsonify({"message": "Comment deleted successfully"}), 200