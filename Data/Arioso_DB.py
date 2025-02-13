import sqlite3

conn = sqlite3.connect('arioso.db')
cursor = conn.cursor()

cursor.execute("INSERT INTO users (id, username, email) VALUES (3398, 'aria', 'aria@arioso.com')")
conn.commit()
conn.close()