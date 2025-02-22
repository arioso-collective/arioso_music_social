import unittest, sqlite3, uuid, hashlib, os
from Arioso_DB import generateUserID, addUser, addPassword, generateSalt, deleteUser, encryptPassword, checkPasswordMatch

class DatabaseTesting(unittest.TestCase):

    def setUp(self):
        self.conn = sqlite3.connect("arioso.db")
        self.cursor = self.conn.cursor()

        #create tables for testing if they don't already exist in the database to prevent errors
        self.cursor.execute("CREATE TABLE IF NOT EXISTS users_new (id TEXT PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE)")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS passwords (userid TEXT PRIMARY KEY, password TEXT, salt BLOB)")
        self.conn.commit()

    def tearDown(self):
        self.conn.commit()
        self.conn.close()

    def test_generateUserID(self):
        userid = generateUserID()
        self.assertIsInstance(userid, str)
        self.assertEqual(len(userid), 36)   

    def test_addUser(self):
        username = "aria"
        email = "aria@arioso.com"
        addUser(self.cursor, username, email)

        #test that both the username and email were added to the database and that they equal the given values
        self.cursor.execute("SELECT username, email FROM users_new WHERE email = ?", (email,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[0], username)
        self.assertEqual(result[1], email)

    def test_addPassword(self):
        testpassword = "password"
        testuserid = "000-000-000"
        addPassword(self.cursor,testuserid, testpassword)

        #test that password was added to passwords table
        self.cursor.execute("SELECT password from passwords WHERE userid = ?", (testuserid,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
    
    def test_generateSalt(self):
        testuserid = "000-000-000"
        generateSalt(self.cursor, testuserid)

        #test that salt was added to passwords table
        self.cursor.execute("SELECT salt from passwords WHERE userid =?", (testuserid,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)

        
    def test_deleteUser(self):
        email = "aria@arioso.com"
        deleteUser(self.cursor,email)

        #test that user no longer exists in database
        self.cursor.execute("SELECT id FROM users_new WHERE email = ?", (email,))
        result = self.cursor.fetchone()
        self.assertIsNone(result)
    
    def test_encryptPassword(self):
        password = "password"
        salt = os.urandom(16)

        #test that stored password is encrypted by comparing it to the plain text password
        result = encryptPassword(password, salt)
        self.assertIsNotNone(result)
        self.assertNotEqual(result, password)

    
    def test_checkPasswordMatch(self):
        password = "password"
        userid = "000-000-000"

        #test that checkPasswordMatch returns a boolean value
        result = checkPasswordMatch(self.cursor, password, userid)
        self.assertIsNotNone(result)
        self.assertIsInstance(result, bool)

    
if __name__ == '__main__':
    unittest.main()