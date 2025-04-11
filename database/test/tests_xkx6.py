import unittest
import mongomock
from app import app
from bson import Binary
from database.password_util import hash_password, compare_password
# import HtmlTestRunner Might need later.

class Tests_XKX6(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

        self.mock_client = mongomock.MongoClient()
        self.mock_db = self.mock_client.testdb
        self.mock_users = self.mock_db.users

        import app as app_module
        app_module.users_collection = self.mock_users


    def test_password_util(self):

    def test_create_user(self): 

        payload = {
            "name": "Aria",
            "email": "arioso@arioso.com",
            "username": "aria",
            "password": Binary(hash_password('password')),   
        }

    def test_get_user(self):

