import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const DummyChatData = [
  {
    senderId: 1,
    receiverId: 2,
    message: "Hi, how are you?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "I am good! How about you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Doing well. Are you free today?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, mostly in the evening.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Great, we should catch up.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Sure, what time works for you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Maybe around 6 PM?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "6 PM sounds good.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Let's meet at the cafe near the office.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Perfect, I like that place.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Did you finish the project work?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Almost done, just a few things left.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Nice! Let me know if you need help.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Thanks, I will.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Also, did you check the new tech article I shared?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, it was really interesting.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "The part about real-time apps was great.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "True, especially the Socket.IO example.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Exactly! I want to try building one.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Let's discuss it in the evening then.",
  },
];

const ChatWindow = ({ receiver }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Message:", message);
    setMessage("");
  };

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
    <div className="p-2 h-full relative">
      <div className="border rounded-lg h-full p-2 flex flex-col">
        {/* Header */}
        <div className="p-3 rounded-lg mb-2 flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {receiver.name.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold text-primary">{receiver.name}</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-2 border rounded-lg bg-accent/30">
          {DummyChatData.map((chat, idx) => (
            <div
              key={idx}
              className={`chat ${
                chat.senderId === 2 ? "chat-receiver" : "chat-sender"
              }`}
            >
              {/* Avatar */}
              {/* <div className="relative">
                <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                  {chat.name.charAt(0)}
                </div>

                Online Dot (optional) 
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-200 rounded-full"></span> 
              </div> */}

              <div className="chat-header text-base-content">
                {chat.senderId === 2 ? receiver.name : "Arpit Gupta"}
              </div>

              <div className="chat-bubble">{chat.message}</div>
            </div>
          ))}
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute bottom-24 left-5 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {/* Input Area */}
        <div className="mt-2 flex gap-2 items-center">
          {/* Emoji Button */}
          <button onClick={() => setShowEmoji(!showEmoji)} className="text-xl">
            <BsEmojiSmile />
          </button>

          {/* File Upload */}
          <label className="cursor-pointer text-xl">
            <GrAttachment />
            <input type="file" hidden onChange={handleFile} />
          </label>

          {/* Message Input */}
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Send Button */}
          <button onClick={sendMessage} className="btn btn-primary">
            <IoSend />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-base-content/60 mt-3">
          Powered by <span className="font-bold">DostiHUB</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
