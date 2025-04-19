from .users import users_bp
from .posts import posts_bp
from .comments import comments_bp
from .auth import auth_bp
from .test import test_bp

def register_routes(app):
    app.register_blueprint(users_bp, url_prefix='/api')
    app.register_blueprint(posts_bp, url_prefix='/api')
    app.register_blueprint(comments_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(test_bp)