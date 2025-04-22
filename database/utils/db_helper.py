from bson import ObjectId
from models.database import users_collection, posts_collection, comments_collection
import logging

logger = logging.getLogger(__name__)

def get_user_by_username(username):
    try:
        return users_collection.find_one({"username": username})
    except Exception as e:
        logger.error(f"Error getting user by username {username}: {str(e)}")
        return None

def get_user_by_id(user_id):
    try:
        return users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception as e:
        logger.error(f"Error getting user by id {user_id}: {str(e)}")
        return None

def get_post_by_id(post_id):
    try:
        return posts_collection.find_one({"_id": ObjectId(post_id)})
    except Exception as e:
        logger.error(f"Error getting post by id {post_id}: {str(e)}")
        return None

def get_post_with_author(post_id):
    post = get_post_by_id(post_id)
    if not post:
        return None

    user = get_user_by_id(post.get("userID"))
    post["author"] = {
        "username": user.get("username"),
        "name": user.get("name"),
        "profilePicture": user.get("profilePicture")
    } if user else None

    return post

def get_comments_for_post(post_id):
    try:
        return list(comments_collection.find({"postID": str(post_id)}).sort("createdAt", 1))
    except Exception as e:
        logger.error(f"Error getting comments for post {post_id}: {str(e)}")
        return []
