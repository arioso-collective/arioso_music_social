import sqlite3, uuid, hashlib

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

def generateUserID():
    new_userid = uuid.uuid4()
    int_userid = new_userid.int
    userid = int_userid >> 64
    return userid

def addUser(username, email):
    userid = generateUserID()
    cursor.execute("""INSERT OR IGNORE INTO users (id, username, email) VALUES (?, ?, ?)""", (userid, username, email))
    return

def deleteUser(email):
    cursor.execute("DELETE FROM users WHERE id = ?", (email,))
    return

def addPassword(userid):
    userpassword = input()
    encryptedPassword = encryptPassword(userpassword)
    cursor.execute("INSERT INTO passwords (password, userid) VALUES (?, ?)", (encryptedPassword, userid))
    return

def encryptPassword(password):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(password.encode('utf-8'))
    encryptedPassword = sha256_hash.hexdigest()

    return encryptedPassword

addPassword(3398)

#cursor.execute("INSERT INTO users (id, username, email) VALUES (3398, 'aria', 'aria@arioso.com')")
conn.commit()
conn.close()