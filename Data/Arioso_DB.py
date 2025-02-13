import sqlite3

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

def addUser(userid, username, email):
    cursor.execute("INSERT INTO users (id, username, email) VALUES (?, ?, ?)", (userid, username, email))
    return

def deleteUser(userid):
    cursor.execute("DELETE FROM users WHERE id = ?", (userid,))
    return

deleteUser(1234)

#cursor.execute("INSERT INTO users (id, username, email) VALUES (3398, 'aria', 'aria@arioso.com')")
conn.commit()
conn.close()