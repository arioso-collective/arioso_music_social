import sqlite3, uuid, hashlib, os

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

def generateUserID():
    new_userid = uuid.uuid4()
    int_userid = new_userid.int
    userid = int_userid >> 64
    return userid

def addUser(username, email):
    userid = generateUserID()
    cursor.execute("INSERT OR IGNORE INTO users (id, username, email) VALUES (?, ?, ?)", (userid, username, email))
    return

def deleteUser(email):
    cursor.execute("DELETE FROM users WHERE id = ?", (email,))
    return

def generateSalt(userid):
    salt = os.urandom(16)
    cursor.execute ("INSERT OR IGNORE INTO users (id, salt) VALUES (?, ?)", (userid, salt))

    return salt

def encryptPassword(password, userid):
    salt = generateSalt(userid)
    pbkdf2_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    encryptedPassword = pbkdf2_hash.hex()

    return encryptedPassword

def addPassword(userid):
    cursor.execute("SELECT password from passwords WHERE userid = ?", (userid,))
    userpassword = cursor.fetchone()

    if userpassword is None:
        userpassword = input()
        encryptedPassword = encryptPassword(userpassword, userid)
        cursor.execute ("INSERT INTO passwords (password, userid) VALUES (?, ?)", (encryptedPassword, userid))
    
    return

#def checkPasswordMatch(password, userid):
 #   cursor.execute("SELECT password from passwords WHERE userid = ?", (userid,))
  #  userpassword = cursor.fetchone()

conn.commit()
conn.close()