import sqlite3, uuid, hashlib, os

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

def generateUserID():
    new_userid = uuid.uuid4()
    userid = str(new_userid)
    return userid

def addUser(username, email):
    userid = generateUserID()
    cursor.execute("INSERT OR IGNORE INTO users_new (id, username, email) VALUES (?, ?, ?)", (userid, username, email))
    return

def deleteUser(email):
    cursor.execute("DELETE FROM users_new WHERE email = ?", (email,))
    return

def generateSalt(userid):
    cursor.execute("SELECT salt FROM passwords WHERE userid = ?", (userid,))
    usersalt = cursor.fetchone()
    print(usersalt)

    if usersalt is None:
        salt = os.urandom(16)
        print(salt)
        cursor.execute ("INSERT INTO passwords (userid, password, salt) VALUES (?, ?, ?)", (userid, "", salt))
    else:
        salt = usersalt[0]
        print(salt)

    return salt

def encryptPassword(password, salt):
    pbkdf2_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    encryptedPassword = pbkdf2_hash.hex()

    return encryptedPassword

def addPassword(userid, password):
    cursor.execute("SELECT password from passwords WHERE userid = ?", (userid,))
    userpassword = cursor.fetchone()

    if userpassword is None:
        salt = generateSalt(userid)
        encryptedPassword = encryptPassword(password, salt)
        cursor.execute ("INSERT OR REPLACE INTO passwords (userid, password, salt) VALUES (?, ?, ?)", (userid, encryptedPassword, salt))
    
    return

#def checkPasswordMatch(password, userid):
   #cursor.execute("SELECT password from passwords WHERE userid = ?", (userid,))
   #userpassword = cursor.fetchone()

   #encryptedPassword = encryptPassword(password, userid)

   #if userpassword == encryptedPassword:
       #return True
   #else:
       #return False

#result = checkPasswordMatch("password", 1234)
#print(result)

conn.commit()
conn.close()