import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CameraIcon,
  ArrowPathIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Turn from "./turn";
import Video from "./video";
import { IMessage, sendAgentMessage } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearState, addState, replaceState } from "../store/chatSlice";
import { addMessage, clearMessages } from "../store/messageSlice";
import { IChatTurn } from "../store";

export const Chat = () => {
  const [showChat, setShowChat] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);

  const chatDiv = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const scrollChat = () => {
    setTimeout(() => {
      if (chatDiv.current) {
        chatDiv.current.scrollTo({
          top: chatDiv.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    scrollChat();
  }, [chat.length, currentImage]);

  const newMessage = (message: IMessage) => {
    //console.log(message);
    dispatch(addMessage(message));
    // support message should be the last one
    if (message.type === "support") {
      dispatch(
        replaceState({
          name: "Jane Doe",
          message: message.data?.response || "I'm sorry, I don't understand.",
          status: "done",
          type: "assistant",
          avatar: "",
          image: null,
        })
      );

      scrollChat();
    }
  };

  const getImageVideo = () => {
    // ask for camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        // show camera
        setShowVideo(true);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.name == "NotAllowedError" ||
          err.name == "PermissionDeniedError"
        ) {
          alert("Please allow camera access to use this feature.");
        } else {
          setShowVideo(true);
        }
      });
  };

  const getImageFile = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const readFile = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return resolve(null);
        if (typeof e.target?.result === "string")
          return resolve(e.target?.result);
        else return resolve(null);
      };
      reader.readAsDataURL(file);
    });
  };

  const reset = () => {
    setCurrentImage(null);
    setMessage("");
    dispatch(clearMessages());
    dispatch(clearState());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    readFile(file!).then((data) => {
      if (!data) return;
      setCurrentImage(data);
      e.target.value = "";
    });
  };

  const sendMessage = () => {
    const newTurn: IChatTurn = {
      name: "John Doe",
      message: message,
      status: "done",
      type: "user",
      avatar: "",
      image: currentImage,
    };

    //const t0 = performance.now();
    if (message !== "") {
      dispatch(addState(newTurn));
      sendAgentMessage(newTurn, newMessage);
    }

    setTimeout(() => {
      dispatch(
        addState({
          name: "Jane Doe",
          message: "Let me see what I can find...",
          status: "waiting",
          type: "assistant",
          avatar: "",
          image: null,
        })
      );
    }, 1);

    setMessage("");
    setCurrentImage(null);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      scrollChat();
      if (chat.length === 0) {
        setTimeout(() => {
          dispatch(
            addState({
              name: "Jane Doe",
              message: "Hi, how can I be helpful today?",
              status: "done",
              type: "assistant",
              avatar: "",
              image: null,
            })
          );
        }, 400);
      }
    }
  };

  const onVideoClick = (dataUrl: string): void => {
    setCurrentImage(dataUrl);
    setShowVideo(false);
  };

  const onVideoClose = (): void => {
    setShowVideo(false);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 mr-12 mb-12 z-10 flex flex-col items-end ">
        {showChat && (
          <div className="mb-3 h-[calc(100vh-7rem)] shadow-md bg-white rounded-lg w-[650px]  flex flex-col">
            <div className="text-right p-2 flex flex-col">
              <ArrowPathIcon className="w-5 stroke-zinc-500" onClick={reset} />
            </div>
            {/* chat section */}
            <div
              className="grow p-2 overscroll-contain overflow-auto"
              ref={chatDiv}
            >
              <div className="flex flex-col gap-4">
                {chat.map((turn, i) => (
                  <Turn key={i} turn={turn} />
                ))}
              </div>
            </div>
            {/* image section */}
            {currentImage && (
              <div className="pt-3 pl-3 pr-3 hover:cursor-pointer">
                <img
                  src={currentImage}
                  className="object-contain w-full h-full rounded-xl"
                  alt="Current Image"
                  onClick={() => setCurrentImage(null)}
                />
              </div>
            )}
            {/* chat input section */}
            <div className="p-3 flex gap-3">
              <input
                id="chat"
                name="chat"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => {
                  if (e.code === "Enter") sendMessage();
                }}
                className="block p-2 grow rounded-md text-zinc-700 shadow-sm ring-2 ring-inset ring-zinc-300 focus:ring-zinc-300 focus:border-zinc-300"
              />
              <button
                className="rounded-md p-2 border-solid border-2 border-zinc-300 hover:cursor-pointer hover:bg-zinc-100"
                onClick={sendMessage}
              >
                <PaperAirplaneIcon className="w-6 stroke-zinc-500" />
              </button>

              <button
                className="rounded-md p-2 border-solid border-2 border-zinc-300 hover:cursor-pointer hover:bg-zinc-100"
                onClick={getImageFile}
              >
                <CameraIcon className="w-6 stroke-zinc-500" />
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileInput}
                onChange={handleFileChange}
              />
              <button
                className="rounded-md p-2 border-solid border-2 border-zinc-300 hover:cursor-pointer hover:bg-zinc-100"
                onClick={getImageVideo}
              >
                <VideoCameraIcon className="w-6 stroke-zinc-500" />
              </button>
            </div>
          </div>
        )}
        <div
          className={clsx(
            "bg-white rounded-full p-2 shadow-lg border-zinc-40 hover:cursor-pointer",
            showChat ? "bg-zinc-200 text-zinc-600" : "text-zinc-600"
          )}
          onClick={toggleChat}
        >
          <ChatBubbleLeftRightIcon className="w-6" />
        </div>
      </div>
      {showVideo && (
        <Video onVideoClick={onVideoClick} onClose={onVideoClose} />
      )}
    </>
  );
};

export default Chat;
