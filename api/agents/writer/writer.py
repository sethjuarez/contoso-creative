import sys
import json
from prompty import execute as flow
from promptflow.tracing import trace


@trace
def write(researchContext, research, productContext, products, assignment):
    result = flow(
        "writer.prompty",
        inputs={
            "researchContext": researchContext,
            "research": research,
            "productContext": productContext,
            "products": products,
            "assignment": assignment,
        },
    )
    return {"article": result}
