import unittest
import mongomock
from app import app
from bson import Binary
from password_util import hash_password, compare_password
#import HtmlTestRunner

class Tests_XKX6(unittest.TestCase):
    #def setUp(self):
        #app.config['TESTING'] = True
        #self.client = app.test_client()

        #self.mock_client = mongomock.MongoClient()
        #self.mock_db = self.mock_client.testdb
        #self.mock_users = self.mock_db.users

        #import app as app_module
        #app_module.users_collection = self.mock_users

    #Test that password is successfully hashed, and that it does not equal the plain_text_password after hashing
    def test_password_hashing(self):
        plain_text_password = "testpassword123!@#$"
        hashed_password = hash_password(plain_text_password)
        self.assertIsInstance(hashed_password, bytes)
        self.assertNotEqual(plain_text_password.encode('utf-8'), hashed_password)
    
    #Test that the same password hashed twice returns a unique hash
    def test_unique_password_hashing(self):
        plain_text_password = "password"
        hashed_password_1 = hash_password(plain_text_password)
        hashed_password_2 = hash_password(plain_text_password)
        self.assertNotEqual(hashed_password_1, hashed_password_2)

    #Test compare password when passwords match
    def test_password_comparison_match(self):
        plain_text_password = "!@#$passwordtest"
        hashed_password = hash_password(plain_text_password)
        self.assertTrue(compare_password(plain_text_password, hashed_password))

    #Test compare password when passwords do not match 
    def test_password_comparison_non_match(self):
        plain_text_password = "ariosoisthebest"
        incorrect_password = "ariosoistheWORST"
        hashed_password = hash_password(plain_text_password)
        self.assertFalse(compare_password(incorrect_password, hashed_password))


    #def test_create_user(self): 

        #payload = {
            #"name": "Aria",
            #"email": "arioso@arioso.com",
            #"username": "aria",
            #"password": Binary(hash_password('password')),   
        #}

    #def test_get_user(self):

if __name__ == '__main__':
    unittest.main()
