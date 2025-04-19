# /db/models.py

# ======================================
# USER MODEL TEMPLATE
# ======================================

user_template = {
    "_id": "ObjectId",            # MongoDB's internal ID
    "name": "str",
    "email": "str",
    "username": "str",
    "password": "bytes",          # stored as binary (hashed)
    "followers": [                # list of user ID objects
        {
            "userId": "str"
        }
    ],
    "followerCount": "int",
    "followingCount": "int",
    "profilePicture": "bytes",    # binary image data
    "bio": "str",
    "musicID": "str",             # e.g. Spotify ID
    "posts": [                    # embedded post summary
        {
            "postId": "str",
            "content": "str",
            "createdAt": "datetime"
        }
    ],
    "favGenres": ["str"],
    "favArtists": ["str"]
}

# ======================================
# POST MODEL TEMPLATE
# ======================================

post_template = {
    "_id": "ObjectId",
    "url": "str",                 # media URL (image/audio)
    "caption": "str",
    "userID": "str",              # user ID string (author)
    "musicID": "str",
    "createdAt": "datetime",
    "likes": "int",
    "likedBy": ["str"]            # list of user ID strings
}

# ======================================
# COMMENT MODEL TEMPLATE
# ======================================

comment_template = {
    "_id": "ObjectId",
    "url": "str",                 # optional media
    "comment": "str",
    "postID": "str",
    "userID": "str",
    "createdAt": "datetime"
}
