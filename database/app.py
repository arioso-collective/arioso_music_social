from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from urllib.parse import quote_plus

username = "xkx6"
password = "@ri0s0"
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

MONGO_CONNECTION_STRING = f"mongodb+srv://{encoded_username}:{encoded_password}@arioso.8hh3i.mongodb.net/?retryWrites=true&w=majority&appName=Arioso"

try:
    mongo_client = MongoClient(MONGO_CONNECTION_STRING, serverSelectionTimeoutMS=5000)
    mongo_client.server_info()  # Check if the server is reachable
    print("Connected to MongoDB Server...")

    database = mongo_client['Arioso']

except ServerSelectionTimeoutError as e:
    print("Could not connect to the MongoDB server...", e)
