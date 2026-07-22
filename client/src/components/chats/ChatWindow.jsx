
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import socketAPI from "../../config/WebSocket.jsx";
import { FaSmile, FaPaperclip } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ receiver, onBack }) => {
  const { user } = useAuth();

  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  const senderId = user?._id || null;
  const receiverId = receiver?._id || null;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
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
      if (!socketAPI.connected) {
        toast.error("Socket disconnected. Please refresh and try again.");
        return;
      }

      socketAPI.emit("send", messagePacket);

      setInputMessage("");

      setMessages((prev) => [
        ...prev,
        {
          ...messagePacket,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Message Sending Failed"
      );
    }
  };

  const fetchAllOldMessage = async () => {
    if (!receiverId) {
      setMessages([]);
      return;
    }

    try {
      const res = await api.get(`/user/fetchMessages/${receiverId}`);
      setMessages(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error Fetching Messages"
      );
    }
  };

  const handleReceiveMessage = (newMessagePack) => {
    const isCurrentChat =
      (newMessagePack.senderId === receiverId &&
        newMessagePack.receiverId === senderId) ||
      (newMessagePack.senderId === senderId &&
        newMessagePack.receiverId === receiverId);

    if (isCurrentChat) {
      setMessages((prev) => [...prev, newMessagePack]);
    }
  };

  useEffect(() => {
    setMessages([]);

    if (receiverId) {
      fetchAllOldMessage();
    }
  }, [receiverId]);

  useEffect(() => {
    socketAPI.on("receive", handleReceiveMessage);

    return () => {
      socketAPI.off("receive", handleReceiveMessage);
    };
  }, [receiverId, senderId]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowEmoji(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      toast.success(`File selected: ${file.name}`);
    }
  };

  if (!receiver) {
    return (
      <div className="flex h-full items-center justify-center bg-base-200">
        <div className="text-center">
          <p className="text-lg font-semibold text-base-content/70">
            Select a contact to start chatting
          </p>

          <p className="mt-1 text-sm text-base-content/50">
            Choose someone from your contacts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-base-200">

      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-3 py-3 shadow-sm">

        {/* Mobile Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost btn-circle md:hidden"
          aria-label="Back to contacts"
        >
          <IoArrowBack className="text-xl" />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
          {receiver.fullName
            ?.split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-base-content">
            {receiver.fullName}
          </h2>

          <p className="text-xs text-success">
            Active chat
          </p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">

        {messages.length > 0 ? (
          messages.map((chat, idx) => {
            const isReceived = chat.senderId === receiverId;

            return (
              <div
                key={chat._id || idx}
                className={`flex ${
                  isReceived ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-xs ${
                    isReceived ? "items-start" : "items-end"
                  }`}
                >
                  <p className="mb-1 text-xs text-base-content/50">
                    {isReceived ? receiver.fullName : user?.fullName}
                  </p>

                  <div
                    className={`wrap-break-word rounded-2xl px-4 py-2 shadow-sm ${
                      isReceived
                        ? "rounded-tl-sm bg-base-100 text-base-content"
                        : "rounded-tr-sm bg-primary text-primary-content"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-base-content/50">
              No messages yet. Start the conversation!
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* EMOJI PICKER */}
      {showEmoji && (
        <div
          className="absolute bottom-20 left-3 z-50"
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

      {/* MESSAGE INPUT */}
      <div className="flex items-center gap-2 border-t border-base-300 bg-base-100 p-3">

        {/* Emoji */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowEmoji((prev) => !prev);
          }}
          className="btn btn-ghost btn-circle"
          aria-label="Add emoji"
        >
          <FaSmile className="text-lg" />
        </button>

        {/* Attachment */}
        <button
          type="button"
          onClick={handleFileClick}
          className="btn btn-ghost btn-circle"
          aria-label="Attach file"
        >
          <FaPaperclip className="text-lg" />
        </button>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Input */}
        <input
          type="text"
          value={inputMessage}
          placeholder="Type a message..."
          className="input input-bordered min-w-0 flex-1 rounded-full"
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="btn btn-primary rounded-full"
        >
          Send
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-base-100 py-1 text-center text-xs text-base-content/40">
        Powered by <span className="font-semibold">DostiHUB</span>
      </div>
    </div>
  );
};

export default ChatWindow;


