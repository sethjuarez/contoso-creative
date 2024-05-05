from pydantic import BaseModel
from prompty.parsers import PromptyChatParser
from prompty import Invoker, Prompty, SimpleModel, InvokerFactory
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

model = AutoModelForCausalLM.from_pretrained(
    "microsoft/Phi-3-mini-4k-instruct",
    device_map="cuda",
    torch_dtype="auto",
    trust_remote_code=True,
)

tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)

@InvokerFactory.register_parser("phi.chat")
class PhiParser(PromptyChatParser):
    def __init__(self, prompty: Prompty) -> None:
        super().__init__(prompty)

    def invoke(self, data: BaseModel) -> BaseModel:
        return super().invoke(data)

@InvokerFactory.register_executor("phi")
class PhiExecutor(Invoker):
    def __init__(self, prompty: Prompty) -> None:
        self.prompty = prompty
        self.api = self.prompty.model.api
        self.parameters = self.prompty.model.parameters

    def invoke(self, data: BaseModel) -> BaseModel:
        assert isinstance(data, SimpleModel)
        if self.api == "chat":
            response = pipe(data.item, **self.parameters)
            return SimpleModel(item=response)

@InvokerFactory.register_processor("phi")
class PhiProcessor(Invoker):
    def __init__(self, prompty: Prompty) -> None:
        self.prompty = prompty

    def invoke(self, data: BaseModel) -> BaseModel:
        assert isinstance(data, BaseModel)
        return SimpleModel[str](item=data.item.output[0]["generated_text"])

