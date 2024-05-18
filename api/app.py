import json
import logging
from dotenv import load_dotenv
from agents.editor import editor
from agents.writer import writer
from flask_cors import cross_origin
from agents.researcher import researcher
from flask import Flask, stream_with_context, request, Response

load_dotenv()


def _create_json_response(type, contents):
    r = {"type": type, "contents": contents}
    logging.debug(r)
    s = json.dumps(r)
    return s


app = Flask(__name__)


@app.route("/article", methods=["POST"])
@cross_origin()
@stream_with_context
def article():
    post = request.get_json()
    context = post["context"]
    instructions = post["instructions"]
    feedback = "No Feedback"
    researchFeedback = ""
    retry_count = 2

    while retry_count > 0:
        yield _create_json_response("message", "Starting research agent task...")
        research_result = researcher.research(context, instructions, researchFeedback)
        yield _create_json_response("researcher", research_result)

        yield _create_json_response("message", "Starting writer agent task...")
        writer_result = writer.write(context, feedback, instructions, research_result)
        yield _create_json_response("writer", writer_result)

        yield _create_json_response("message", "Starting editor agent task...")
        editor_result = editor.edit(writer_result["article"], writer_result["feedback"])
        yield _create_json_response("editor", editor_result)

        if str(editor_result["decision"]).lower().startswith("accept"):
            break
        else:
            researchFeedback = editor_result.get("researchFeedback", "No Feedback")
            feedback = editor_result.get("editorFeedback", "No Feedback")

        retry_count -= 1

    return Response(article(), mimetype="application/json")
