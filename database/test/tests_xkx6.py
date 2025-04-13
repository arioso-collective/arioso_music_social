import unittest
import mongomock
from app import app
from bson import Binary
from password_util import hash_password, compare_password
from datetime import datetime
#import HtmlTestRunner

class Tests_XKX6(unittest.TestCase):
    # Set up Mock MongoDB Database for testing when running each test
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

        self.mock_client = mongomock.MongoClient()
        self.mock_db = self.mock_client.testdb
        self.mock_users = self.mock_db.users

        import app as app_module
        app_module.users_collection = self.mock_users

    # Test that password is successfully hashed, and that it does not equal the plain_text_password after hashing
    def test_password_hashing(self):
        plain_text_password = "testpassword123!@#$"
        hashed_password = hash_password(plain_text_password)
        self.assertIsInstance(hashed_password, bytes)
        self.assertNotEqual(plain_text_password.encode('utf-8'), hashed_password)
    
    # Test that the same password hashed twice returns a unique hash
    def test_unique_password_hashing(self):
        plain_text_password = "password"
        hashed_password_1 = hash_password(plain_text_password)
        hashed_password_2 = hash_password(plain_text_password)
        self.assertNotEqual(hashed_password_1, hashed_password_2)

    # Test compare password when passwords match
    def test_password_comparison_match(self):
        plain_text_password = "!@#$passwordtest"
        hashed_password = hash_password(plain_text_password)
        self.assertTrue(compare_password(plain_text_password, hashed_password))

    # Test compare password when passwords do not match 
    def test_password_comparison_non_match(self):
        plain_text_password = "ariosoisthebest"
        incorrect_password = "ariosoistheWORST"
        hashed_password = hash_password(plain_text_password)
        self.assertFalse(compare_password(incorrect_password, hashed_password))

    # Test create user to ensure it requires all fields
    def test_create_user_with_missing_fields(self):
        response = self.client.post('/api/create_user', json={
            "name": "Aria",
            "email": "arioso@arioso.com",
            "username": "aria"
            # Missing "password" field   
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn("All fields are required", response.get_data(as_text=True))

    # Test create user does not allow duplicate usernames
    def test_create_user_with_duplicate_username(self):
        self.mock_users.insert_one({
            'name': 'Dr. Lehr',
            'email': 'drlehr@txstate.edu',
            'username': 'drlehr',
            'password': Binary(b'hashed')
        })

        response = self.client.post('/api/create_user', json={
            'name': 'Not Dr. Lehr',
            'email': 'notdrlehr@txstate.edu',
            'username': 'drlehr',
            'password': 'reallystrongpassword'
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Username already exists', response.get_data(as_text=True))
    
    # Test create user does not allow duplicate emails
    def test_create_user_with_duplicate_email(self):
        self.mock_users.insert_one({
            'name': 'Dr. Lehr',
            'email': 'drlehr@txstate.edu',
            'username': 'drlehr',
            'password': Binary(b'hashed')
        })

        response = self.client.post('/api/create_user', json={
            'name': 'Not Dr. Lehr',
            'email': 'drlehr@txstate.edu',
            'username': 'notdrlehr',
            'password': 'reallystrongpassword'
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Email already exists', response.get_data(as_text=True))

    # Test a successful user creation
    def test_create_user_functionality(self): 
        plain_text_password = "AriosoForTheWin"

        response = self.client.post('/api/create_user', json={
            "name": "Aria",
            "email": "aria@arioso.com",
            "username": "aria",
            "password": plain_text_password,
        })

        self.assertEqual(response.status_code, 201)
        user_in_database = self.mock_users.find_one({"username": "aria"})
        self.assertIsNotNone(user_in_database)

        # Ensure password in database is hashed
        self.assertIsInstance(user_in_database["password"], Binary)
        # Ensure password in database is not plain text password
        self.assertNotEqual(user_in_database["password"], Binary(plain_text_password.encode('utf-8'))) 

        data = response.get_json()
        self.assertEqual(data['message'], 'User created successfully')
        self.assertEqual(data['user']['username'], 'aria')
        self.assertEqual(data['user']['email'], 'aria@arioso.com')
        # Ensure password is not in response for security purposes
        self.assertNotIn('password', data['user']) 
        
    #def test_get_user(self):

if __name__ == '__main__':
    unittest.main()
