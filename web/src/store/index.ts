import { endpoint } from "../endpoint";
export interface IMessage {
  type: "message" | "inspector" | "support" | "customer" | "error";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface IChatTurn {
  name: string;
  avatar: string;
  image: string | null;
  message: string;
  status: "waiting" | "done";
  type: "user" | "assistant";
}

export const sendAgentMessage = (
  turn: IChatTurn,
  addMessage: { (message: IMessage): void }
) => {
  // internal function to read chunks from a stream
  function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
    return {
      async *[Symbol.asyncIterator]() {
        let readResult = await reader.read();
        while (!readResult.done) {
          yield readResult.value;
          readResult = await reader.read();
        }
      },
    };
  }

  const configuration = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: turn.message,
      image: turn.image,
      customerId: "3",
    }),
  };

  const url = `${endpoint.endsWith("/") ? endpoint : endpoint + "/"}api/trade`;
  fetch(url, configuration).then(async (response) => {
    const reader = response.body?.getReader();
    if (!reader) return;

    const partials = [];
    const chunks = readChunks(reader);
    for await (const chunk of chunks) {
      const text = new TextDecoder().decode(chunk);
      const parts = text.split(">>>>");
      for (let part of parts) {
        part = part.trim();
        if (part === "") continue;
        partials.push(part);
        if (part.endsWith("}")) {
          const message = JSON.parse(partials.join("")) as IMessage;
          partials.splice(0, partials.length);
          addMessage(message);
        }
      }
    }
  });
};
