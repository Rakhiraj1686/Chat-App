import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import socketAPI from "../../config/WebSocket";
import { FaSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ receiver }) => {
  const { user } = useAuth();
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  const senderId = user?._id || null;
  const receiverId = receiver?._id || null;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const scrolltoBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrolltoBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (!senderId) {
      toast.error("Please login again to send messages.");
      return;
    }

    if (!receiverId) {
      toast.error("This contact cannot receive messages yet.");
      return;
    }

    if (!inputMessage.trim()) {
      return;
    }

    const messagePacket = {
      senderId,
      receiverId,
      message: inputMessage.trim(),
    };

    const timestamp = new Date().toISOString();

    try {
      if (socketAPI.connected) {
        socketAPI.emit("send", messagePacket);
        setInputMessage("");
        setMessages((prev) => [
          ...prev,
          { ...messagePacket, createdAt: timestamp, updatedAt: timestamp },
        ]);
      } else {
        toast.error("Socket disconnected. Please refresh and try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Message Sending Failed");
    }
  };

  const fetchAllOldMessage = async () => {
    if (!receiverId) {
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

  const handleReceiveMessage = (newMessagePack) => {
    setMessages((prev) => [...prev, newMessagePack]);
  };

  useEffect(() => {
    setMessages([]);
    if (receiver) {
      fetchAllOldMessage();
    }
  }, [receiver]);

  useEffect(() => {
    socketAPI.on("receive", handleReceiveMessage);

    return () => {
      socketAPI.off("receive", handleReceiveMessage);
    };
  }, [receiverId]);

  // close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowEmoji(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.success(`File selected: ${file.name}`);
    }
  };

  if (!receiver) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 rounded-xl shadow-md relative">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b rounded-t-xl">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
          {receiver.fullName?.charAt(0)}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{receiver.fullName}</h2>
          <p className="text-xs text-gray-500">Active chat</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((chat, idx) => (
            <div
              key={idx}
              className={`flex ${
                chat.senderId === receiverId
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  {chat.senderId === receiverId
                    ? receiver.fullName
                    : user.fullName}
                </p>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs wrap-break-word shadow-sm ${
                    chat.senderId === receiverId
                      ? "bg-white text-gray-800"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Loading chats...</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div
          className="absolute bottom-20 left-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setInputMessage((prev) => prev + emojiData.emoji);
              setShowEmoji(false);
            }}
            height={350}
            width={300}
          />
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t flex gap-2 items-center">
        
        {/* Emoji Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEmoji(!showEmoji);
          }}
          className="text-xl"
        >
          <FaSmile />
        </button>

        {/* File Button */}
        <button onClick={handleFileClick} className="text-xl">
          <FaPaperclip />
        </button>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Text Input */}
        <input
          type="text"
          value={inputMessage}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send Button */}
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          onClick={handleSend}
          disabled={inputMessage === ""}
        >
          Send
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-2">
        Powered by <span className="font-semibold">ChatAppFSD45</span>
      </div>
    </div>
  );
};

export default ChatWindow;