import sys
import json
import prompty


@prompty.trace
def execute(context, feedback, instructions, research=[]):
    result = prompty.execute(
        "writer.prompty",
        inputs={
            "context": context,
            "feedback": feedback,
            "instructions": instructions,
            "research": research,
        },
    )
    return result


@prompty.trace
def process(writer):
    # parse string this chracter --- , article and feedback
    result = writer.split("---")
    article = str(result[0]).strip()
    if len(result) > 1:
        feedback = str(result[1]).strip()
    else:
        feedback = "No Feedback"

    return {
        "article": article,
        "feedback": feedback,
    }


@prompty.trace
def write(context, feedback, instructions, research):
    result = execute(
        context=context,
        feedback=feedback,
        instructions=instructions,
        research=research,
    )
    processed = process(result)
    return processed


if __name__ == "__main__":
    # get args from the user
    context = sys.argv[1]
    feedback = sys.argv[2]
    instructions = sys.argv[3]
    research = json.dumps(sys.argv[4])
    result = execute(
        context=str(context),
        feedback=str(feedback),
        instructions=str(instructions),
        research=research,
    )
    processed = process(result)
    print(processed)