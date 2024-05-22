import json
import logging
from dataclasses import dataclass
from typing import Generator, List, Literal, Union
from dotenv import load_dotenv
from flask_cors import cross_origin
from flask import Flask, stream_with_context, request, Response
from promptflow.tracing import trace, start_trace

# agents
from agents.researcher import researcher
from agents.product import product
from agents.writer import writer

load_dotenv()

start_trace()

app = Flask(__name__)


@dataclass
class Message:
    type: Literal["message", "researcher", "marketing", "writer"]
    message: str
    data: Union[dict,list]

    def to_dict(self) -> str:
        return self.__dict__

    def to_json(self) -> str:
        return json.dumps(self.__dict__) + ">>>>\n"

    @staticmethod
    def create(
        type: Literal["message", "researcher", "marketing", "writer"],
        message: str,
        data: Union[dict, list, None] = None
    ):
        return Message(type, message, data)


@trace
def create(research_context, product_context, assignment_context) -> Generator[Message, None, None]:
    try:
        yield Message.create("message", "Starting research agent task...").to_json()
        research_result = researcher.research(research_context)
        yield Message.create(
            "researcher", "Completed research task", research_result
        ).to_json()

        yield Message.create(
            "message", "Starting product marketing agent task..."
        ).to_json()
        product_result = product.find_products(product_context)
        yield Message.create(
            "marketing", "Completed marketing task", product_result
        ).to_json()

        yield Message.create("message", "Starting writer agent task...").to_json()
        writer_result = writer.write(
            research_context,
            research_result,
            product_context,
            product_result,
            assignment_context,
        )
        yield Message.create("writer", "Completed writing task", writer_result).to_json()
    except Exception as e:
        yield Message.create("message", "An error occurred.", str(e)).to_json()


@app.route("/api/article", methods=["POST"])
@cross_origin()
@trace
@stream_with_context
def article():
    post = request.get_json()
    research_context = post["research"]
    product_context = post["products"]
    assignment_context = post["assignment"]

    for response in create(research_context, product_context, assignment_context):
        yield response

    yield Message.create("message", "Task completed.").to_json()

    return Response(article(), mimetype="application/json")
