import sqlite3, uuid, hashlib, os

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

def generateUserID():
    new_userid = uuid.uuid4()
    userid = str(new_userid)
    return userid

def addUser(cursor,username, email):
    userid = generateUserID()
    cursor.execute("INSERT OR IGNORE INTO users_new (id, username, email) VALUES (?, ?, ?)", (userid, username, email))
    return

def deleteUser(cursor,email):
    cursor.execute("DELETE FROM users_new WHERE email = ?", (email,))
    return

def generateSalt(cursor,userid):
    cursor.execute("SELECT salt FROM passwords WHERE userid = ?", (userid,))
    usersalt = cursor.fetchone()

    if usersalt is None:
        salt = os.urandom(16)
        cursor.execute ("INSERT INTO passwords (userid, password, salt) VALUES (?, ?, ?)", (userid, "", salt))
    else:
        salt = usersalt[0]

    return salt

def encryptPassword(password, salt):
    pbkdf2_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    encryptedPassword = pbkdf2_hash.hex()

    return encryptedPassword

def addPassword(cursor,userid, password):
    cursor.execute("SELECT password from passwords WHERE userid = ?", (userid,))
    userpassword = cursor.fetchone()

    if userpassword is None:
        salt = generateSalt(cursor,userid)
        encryptedPassword = encryptPassword(password, salt)
        cursor.execute ("INSERT OR REPLACE INTO passwords (userid, password, salt) VALUES (?, ?, ?)", (userid, encryptedPassword, salt))
    
    return

def checkPasswordMatch(cursor,password, userid):
   cursor.execute("SELECT password, salt from passwords WHERE userid = ?", (userid,))
   result = cursor.fetchone()

   if result is None:
    return False

   userpassword, salt = result
   encryptedPassword = encryptPassword(password, salt)

   if userpassword == encryptedPassword:
       return True
   else:
       return False

conn.commit()
conn.close()

