from flask_jwt_extended import JWTManager
from flask_cors import CORS

jwt = JWTManager()
cors = CORS(origins=["http://localhost:5173"], supports_credentials=True)