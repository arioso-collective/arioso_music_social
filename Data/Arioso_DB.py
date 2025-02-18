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
    cursor.execute("""INSERT OR IGNORE INTO users (id, username, email) VALUES (?, ?, ?)""", (userid, username, email))
    return

def deleteUser(email):
    cursor.execute("DELETE FROM users WHERE id = ?", (email,))
    return

def encryptPassword(password):
    salt = os.urandom(16)
    pbkdf2_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    #pbkdf2_hash.update(password.encode('utf-8'))
    encryptedPassword = pbkdf2_hash.hexdigest()

    return encryptedPassword

#cursor.execute("INSERT INTO users (id, username, email) VALUES (3398, 'aria', 'aria@arioso.com')")
conn.commit()
conn.close()