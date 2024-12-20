from flask import Flask
from routes.user_route import user
from routes.token_route import token

app = Flask(__name__)

# routes
app.register_blueprint(user)
app.register_blueprint(token)
