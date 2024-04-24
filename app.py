from flask import Flask, stream_with_context, request
from flask_cors import CORS
from dotenv import load_dotenv
from agents.editor import editor
from agents.researcher import researcher
from agents.writer import writer

load_dotenv()

app = Flask(__name__)

@stream_with_context
@app.route("/article", methods=["POST"])
def write():
    content = request.get_json()
    editor.execute(content["article"], content["feedback"])
    
    return "<p>Hello, World!</p>"
