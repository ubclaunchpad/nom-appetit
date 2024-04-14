# ===== imports =====
from flask import Flask
from flask import request

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing  =====
@app.route("/search", methods=['GET', 'POST'])
def search():
    return "hello world"

if __name__ == "__main__":
    app.run(debug=True)