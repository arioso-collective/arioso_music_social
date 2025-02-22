import unittest, sqlite3, uuid, hashlib, os
from Arioso_DB import generateUserID, addUser, addPassword, generateSalt, deleteUser, encryptPassword, checkPasswordMatch

class DatabaseTesting(unittest.TestCase):

    def setUp(self):
        self.conn = sqlite3.connect("arioso.db")
        self.cursor = self.conn.cursor()

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

        
        self.cursor.execute("SELECT username, email FROM users_new WHERE email = ?", (email,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[0], username)
        self.assertEqual(result[1], email)

    def test_addPassword(self):
        testpassword = "password"
        testuserid = "000-000-000"
        addPassword(self.cursor,testuserid, testpassword)

        self.cursor.execute("SELECT password from passwords WHERE userid = ?", (testuserid,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
    
    def test_generateSalt(self):
        testuserid = "000-000-000"
        generateSalt(self.cursor, testuserid)

        self.cursor.execute("SELECT salt from passwords WHERE userid =?", (testuserid,))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)

        
    def test_deleteUser(self):
        email = "aria@arioso.com"
        deleteUser(self.cursor,email)

        self.cursor.execute("SELECT id FROM users_new WHERE email = ?", (email,))
        result = self.cursor.fetchone()
        self.assertIsNone(result)
    
    #def test_encryptPassword(self):
        #password = "password"
        #salt = os.urandom(16)

        #result = encryptPassword(password, salt)
        #self.assertIsNone(result)
        #self.assertNotEqual(result, password)

    
    #def test_checkPasswordMatch():

    
if __name__ == '__main__':
    unittest.main()