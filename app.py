from flask import Flask, stream_with_context, request
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@stream_with_context
@app.route("/article", methods=["POST"])
def write():
    content = request.get_json()
    return "<p>Hello, World!</p>"
