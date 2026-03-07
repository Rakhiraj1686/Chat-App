import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import socketAPI from "../../config/WebSocket";

// const DummyChatData = [
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Hi, how are you?",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "I am good! How about you?",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Doing well. Are you free today?",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Yes, mostly in the evening.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Great, we should catch up.",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Sure, what time works for you?",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Maybe around 6 PM?",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "6 PM sounds good.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Let's meet at the cafe near the office.",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Perfect, I like that place.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Did you finish the project work?",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Almost done, just a few things left.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Nice! Let me know if you need help.",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Thanks, I will.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Also, did you check the new tech article I shared?",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Yes, it was really interesting.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "The part about real-time apps was great.",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "True, especially the Socket.IO example.",
//   },
//   {
//     senderId: 1,
//     receiverId: 2,
//     message: "Exactly! I want to try building one.",
//   },
//   {
//     senderId: 2,
//     receiverId: 1,
//     message: "Let's discuss it in the evening then.",
//   },
// ];

const ChatWindow = ({ receiver }) => {
  const { user } = useAuth();
  const bottomRef = useRef(null);

  const senderId = user?._id;
  const receiverId = receiver?._id;
  const isValidObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ""));

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleEmojiClick = (emojiData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const scrolltoBottom = () => {
    console.log(bottomRef);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //On Every New Message
  useEffect(() => {
    scrolltoBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (!receiverId || !isValidObjectId(receiverId) || !inputMessage.trim()) {
      return;
    }

    //call Backend

    const messagePacket = {
      senderId,
      receiverId,
      message: inputMessage.trim(),
    };

    const timestamp = new Date().toISOString();

    try {
      // const res = await api.post(`/user/sendMessage/${receiverId}`, {
      //   inputMessage,
      // });
      //socketAPI.emit("send",messagePacket)
      setInputMessage("");
      setMessages((prev) => [
        ...prev,
        { ...messagePacket, createdAt: timestamp, updatedAt: timestamp },
      ]);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Message Sending Failed");
    }
  };

  const fetchAllOldMessage = async () => {
    if (!receiverId || !isValidObjectId(receiverId)) {
      setMessages([]);
      return;
    }

    try {
      const res = await api.get(`/user/fetchMessages/${receiverId}`);
      setMessages(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error Fetching Messages");
    }
  };

  //on component Load
  useEffect(() => {
    setMessages([]);
    if (receiverId) {
      fetchAllOldMessage();
    }
  }, [receiverId]);

  if (!receiver) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">
          Select a contact to start chatting...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 h-full">
        <div className="border rounded-lg h-full p-2">
          <div className="bg-primary p-3 rounded-lg mb-2">
            <h2 className="text-lg font-bold text-primary-content">
              {receiver.fullName}
            </h2>
          </div>

          <div className="h-4/5 overflow-y-auto p-2 border rounded-lg bg-accent/30">
            {messages.length > 0 ? (
              messages.map((chat, idx) => (
                <div
                  key={idx}
                  className={`chat ${chat.senderId === receiverId ? "chat-receiver" : "chat-sender"}`}
                >
                  <div className="chat-header text-base-content">
                    {chat.senderId === receiverId
                      ? receiver.fullName
                      : user.fullName}
                  </div>
                  <div className="chat-bubble">{chat.message}</div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {" "}
                Loading Chats ...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              placeholder="Type your message..."
              className="input input-bordered w-full"
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-primary disabled:bg-secondary"
              onClick={handleSend}
              disabled={inputMessage.trim() === ""}
            >
              Send
            </button>
          </div>

          <div className="text-center text-sm text-base-content/60 mt-1">
            Powered by <span className="font-bold">ChatAppFSD45</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
