import unittest, sqlite3, uuid, hashlib, os
from Arioso_DB import generateUserID, addUser, addPassword, generateSalt, deleteUser, encryptPassword, checkPasswordMatch

class DatabaseTesting(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.conn = sqlite3.connect("arioso.db")
        cls.cursor = cls.conn.cursor()

        cls.cursor.execute("CREATE TABLE users_new (id TEXT PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE)")
        cls.cursor.execute("CREATE TABLE passwords (userid TEXT PRIMARY KEY, password TEXT, salt BLOB)")
        cls.conn.commit()

    @classmethod
    def tearDownClass(cls):
        cls.conn.close()

    def test_generateUserID(self):
        userid = generateUserID()
        self.assertIsInstance(userid, str)
        self.assertEqual(len(userid), 36)

    #def test_addUser(self):

    #def test_addPasswordTest(self):
    
    #def test_generateSaltTest():
        
    #def test_deleteUserTest():
    
    #def test_encryptPasswordTest():
    
    #def test_checkPasswordMatchTest():
    
    if __name__ == '__main__':
        unittest.main()