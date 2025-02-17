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

#cursor.execute("INSERT INTO users (id, username, email) VALUES (3398, 'aria', 'aria@arioso.com')")
conn.commit()
conn.close()