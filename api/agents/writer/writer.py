import os
import json
from pathlib import Path
from promptflow.tracing import trace
from promptflow.core import Flow, AzureOpenAIModelConfiguration

base = Path(__file__).parent


@trace
def write(researchContext, research, productContext, products, assignment):
    configuration = AzureOpenAIModelConfiguration(
        azure_deployment="gpt-4o",
        api_version="2024-02-01",
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT_4O"),
        api_key=os.getenv("AZURE_OPENAI_KEY_40"),
    )
    flow = Flow.load(
        base / "writer.prompty",
        model={"configuration": configuration, "parameters": {"max_tokens": 1200}},
    )
    result = flow(
        researchContext=researchContext,
        research=research,
        productContext=productContext,
        products=products,
        assignment=assignment,
    )
    return {"article": result.replace("```markdown\n", "").replace("\n```", "")}


if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()

    researchContext = (
        "Can you find the latest camping trends and what folks are doing in the winter?"
    )
    research = json.loads(Path(base / "research.json").read_text())
    productContext = "Can you use a selection of tents and backpacks as context?"
    products = json.loads(Path(base / "products.json").read_text())
    assignment = "Write a fun and engaging article that includes the research and product information. The article should be between 800 and 1000 words."
    result = write(researchContext, research, productContext, products, assignment)
    print(result)
