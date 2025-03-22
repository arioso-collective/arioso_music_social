##MongoDB Setup & Troubleshooting Guide

Initial Setup

1. Create a MongoDB Atlas Account
   - Go to https://www.mongodb.com/cloud/atlas and create an account or log in.

2. Add a Database User (Admin)
   - Go to Database Access → Add New Database User
   - Important:
     - Make sure to assign the user the role 'Atlas Admin' to ensure they have the permissions required to update IP addresses and access necessary admin functions.

3. Connect to cluster using Compass
   - Download Compass https://www.mongodb.com/products/tools/compass 
   - Connect through MongoDB Atlas
   - Select connecting though Compass option 
   - Use your netID with the password: arioso
 
4. Add IP Address to Whitelist
   - Navigate to Network Access → Add IP Address
   - There will also be an automatic popup at the top of the screen to add your current IP address at the time of you accessing MondoDB Atlas 


Reconnecting Later

MongoDB Atlas is IP-restricted for security. Each time your IP address changes, you must update the IP whitelist.

To Update IP Address without popup:
1. Go to Network Access
2. Click Edit next to your old IP or click Add IP Address
3. Add your new IP address
4. Save and wait a few seconds

❗Troubleshooting Tips

- Can't connect to cluster?
  - Make sure your IP address is added in the Network Access section.
  - You will have to check this on MongoDB Atlas 
  - Ensure your database user has 'Atlas Admin' privileges.


- Testing connection locally?
  - Use the MongoDB URI provided in the Atlas dashboard and plug it into Compass.