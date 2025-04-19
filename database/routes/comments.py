from flask import Blueprint, request, jsonify
from bson import ObjectId
from flask_jwt_extended import jwt_required
from models.database import comments_collection

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/api/update_comment/<comment_id>', methods=['PUT'])
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

@comments_bp.route('/api/delete_comment/<comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    result = comments_collection.delete_one({'_id': ObjectId(comment_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Comment not found"}), 404
    return jsonify({"message": "Comment deleted successfully"}), 200