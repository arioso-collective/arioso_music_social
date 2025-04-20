from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os
import logging

load_dotenv()

logger = logging.getLogger(__name__)

encoded_username = quote_plus(os.getenv("MONGO_USERNAME"))
encoded_password = quote_plus(os.getenv("MONGO_PASSWORD"))

MONGO_CONNECTION_STRING = f"mongodb+srv://{encoded_username}:{encoded_password}@arioso.8hh3i.mongodb.net/?retryWrites=true&w=majority&appName=arioso"

mongo_client = MongoClient(MONGO_CONNECTION_STRING, serverSelectionTimeoutMS=5000)
db = mongo_client['arioso']
users_collection = db['users']
posts_collection = db['posts']
comments_collection = db['comments']
blacklist_tokens_collection = db["blacklist_tokens"]

def test_mongo_connection():
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