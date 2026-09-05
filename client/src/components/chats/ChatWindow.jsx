import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import socketAPI from "../../config/WebSocket.jsx";
import { FaSmile, FaPaperclip } from "react-icons/fa";
import { IoArrowBack, IoSend, IoSearchOutline, IoClose, IoChevronUp, IoChevronDown } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import ChatProfilePanel from "./ChatProfilePanel";

const formatTime = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

// Extracts http(s) links from real message text — used for the profile
// panel's "Shared links" section. Nothing here is invented; if there are no
// links in the conversation, the list is simply empty.
const URL_PATTERN = /\bhttps?:\/\/[^\s<>"')]+/gi;

const extractLinks = (messages) => {
  const found = new Set();
  messages.forEach((chat) => {
    const matches = chat.message?.match(URL_PATTERN);
    matches?.forEach((url) => found.add(url.replace(/[.,;]+$/, "")));
  });
  return Array.from(found).reverse();
};

const ChatWindow = ({ receiver, onBack }) => {
  const { user } = useAuth();

  const bottomRef = useRef(null);
  const fileRef = useRef(null);
  const messageRefs = useRef({});

  const senderId = user?._id || null;
  const receiverId = receiver?._id || null;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMatchIdx, setActiveMatchIdx] = useState(0);

  const isOnline = Boolean(receiverId && onlineUsers?.[receiverId]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!showSearch) scrollToBottom();
  }, [messages, showSearch]);

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
        { ...messagePacket, createdAt: timestamp, updatedAt: timestamp },
      ]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message sending failed");
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
      toast.error(error?.response?.data?.message || "Error fetching messages");
    }
  };

  const handleReceiveMessage = (newMessagePack) => {
    const isCurrentChat =
      (newMessagePack.senderId === receiverId && newMessagePack.receiverId === senderId) ||
      (newMessagePack.senderId === senderId && newMessagePack.receiverId === receiverId);

    if (isCurrentChat) {
      setMessages((prev) => [...prev, newMessagePack]);
    }
  };

  useEffect(() => {
    setMessages([]);
    setShowProfile(false);
    setShowSearch(false);
    setSearchTerm("");
    if (receiverId) {
      fetchAllOldMessage();
    }
    // fetchAllOldMessage is redefined each render but only depends on
    // receiverId, which is already a dependency here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  useEffect(() => {
    socketAPI.on("receive", handleReceiveMessage);
    return () => socketAPI.off("receive", handleReceiveMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId, senderId]);

  useEffect(() => {
    const handleOnlineUsers = (users) => setOnlineUsers(users || {});
    socketAPI.on("onlineUsers", handleOnlineUsers);
    return () => socketAPI.off("onlineUsers", handleOnlineUsers);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowEmoji(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFileClick = () => fileRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File selected: ${file.name}`);
    }
  };

  const sharedLinks = useMemo(() => extractLinks(messages), [messages]);

  const matchingIds = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return messages
      .map((chat, idx) => ({ chat, idx }))
      .filter(({ chat }) => chat.message?.toLowerCase().includes(term))
      .map(({ chat, idx }) => chat._id || `idx-${idx}`);
  }, [messages, searchTerm]);

  useEffect(() => {
    setActiveMatchIdx(0);
  }, [searchTerm]);

  useEffect(() => {
    if (matchingIds.length === 0) return;
    const targetId = matchingIds[activeMatchIdx] ?? matchingIds[0];
    messageRefs.current[targetId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeMatchIdx, matchingIds]);

  const jumpMatch = (direction) => {
    if (matchingIds.length === 0) return;
    setActiveMatchIdx((prev) => (prev + direction + matchingIds.length) % matchingIds.length);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  const openProfile = () => setShowProfile(true);

  const handleSearchFromProfile = () => {
    setShowProfile(false);
    setShowSearch(true);
  };

  if (!receiver) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-base-200 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
          💬
        </div>
        <h2 className="font-display mt-5 text-xl font-semibold text-base-content">
          Your conversations start here
        </h2>
        <p className="mt-2 max-w-xs text-sm text-base-content/55">
          Pick someone from the list to pick up a conversation, or start a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-w-0 flex-1">
      {/* ================= CHAT COLUMN ================= */}
      <div className="flex h-full min-w-0 flex-1 flex-col bg-base-200">
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-3 py-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/70 hover:bg-base-200 md:hidden"
            aria-label="Back to contacts"
          >
            <IoArrowBack className="text-xl" />
          </button>

          <button
            type="button"
            onClick={openProfile}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-field py-1 text-left transition hover:bg-base-200 md:pr-2"
            title="View profile"
          >
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral text-sm font-semibold text-neutral-content">
                {getInitials(receiver.fullName)}
              </div>
              {isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-100 bg-success" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="font-display truncate font-semibold text-base-content">
                {receiver.fullName}
              </h2>
              <p className={`text-xs ${isOnline ? "text-success" : "text-base-content/45"}`}>
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-field transition-colors ${
              showSearch ? "bg-primary/10 text-primary" : "text-base-content/60 hover:bg-base-200"
            }`}
            aria-label="Search in conversation"
            title="Search in conversation"
          >
            <IoSearchOutline className="text-lg" />
          </button>
        </div>

        {/* SEARCH BAR */}
        {showSearch && (
          <div className="flex items-center gap-2 border-b border-base-300 bg-base-100 px-3 py-2.5">
            <IoSearchOutline className="shrink-0 text-base text-base-content/40" />
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in this conversation"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/45"
            />
            {searchTerm && (
              <span className="shrink-0 text-xs text-base-content/45">
                {matchingIds.length > 0 ? `${activeMatchIdx + 1}/${matchingIds.length}` : "0 results"}
              </span>
            )}
            <button
              type="button"
              onClick={() => jumpMatch(-1)}
              disabled={matchingIds.length === 0}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-field text-base-content/60 hover:bg-base-200 disabled:opacity-30"
              aria-label="Previous match"
            >
              <IoChevronUp />
            </button>
            <button
              type="button"
              onClick={() => jumpMatch(1)}
              disabled={matchingIds.length === 0}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-field text-base-content/60 hover:bg-base-200 disabled:opacity-30"
              aria-label="Next match"
            >
              <IoChevronDown />
            </button>
            <button
              type="button"
              onClick={closeSearch}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-field text-base-content/60 hover:bg-base-200"
              aria-label="Close search"
            >
              <IoClose />
            </button>
          </div>
        )}

        {/* MESSAGES */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length > 0 ? (
            messages.map((chat, idx) => {
              const isReceived = chat.senderId === receiverId;
              const msgId = chat._id || `idx-${idx}`;
              const isMatch = matchingIds.includes(msgId);
              const isActiveMatch = isMatch && matchingIds[activeMatchIdx] === msgId;

              return (
                <div
                  key={msgId}
                  ref={(el) => {
                    messageRefs.current[msgId] = el;
                  }}
                  className={`message-in flex ${isReceived ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] md:max-w-sm ${isReceived ? "items-start" : "items-end"}`}>
                    <div
                      className={`wrap-break-word rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-shadow ${
                        isReceived
                          ? "rounded-tl-md bg-base-100 text-base-content"
                          : "rounded-tr-md bg-primary text-primary-content"
                      } ${isActiveMatch ? "ring-2 ring-offset-2 ring-offset-base-200 ring-warning" : isMatch ? "ring-2 ring-warning/40" : ""}`}
                    >
                      {chat.message}
                    </div>
                    <p
                      className={`mt-1 text-[11px] text-base-content/40 ${
                        isReceived ? "text-left" : "text-right"
                      }`}
                    >
                      {formatTime(chat.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-base-content/50">
                No messages yet — say hello to {receiver.fullName?.split(" ")[0]}.
              </p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* EMOJI PICKER */}
        {showEmoji && (
          <div className="absolute bottom-20 left-3 z-50" onClick={(e) => e.stopPropagation()}>
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
        <div className="flex items-center gap-1.5 border-t border-base-300 bg-base-100 p-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji((prev) => !prev);
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base-content/55 hover:bg-base-200"
            aria-label="Add emoji"
          >
            <FaSmile className="text-lg" />
          </button>

          <button
            type="button"
            onClick={handleFileClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base-content/55 hover:bg-base-200"
            aria-label="Attach file"
          >
            <FaPaperclip className="text-base" />
          </button>

          <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />

          <input
            type="text"
            value={inputMessage}
            placeholder="Type a message…"
            aria-label="Message"
            className="h-11 min-w-0 flex-1 rounded-full border border-base-300 bg-base-200/60 px-4 text-sm outline-none ring-primary/25 transition focus:border-primary focus:ring-2"
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition-transform enabled:hover:-translate-y-px disabled:opacity-40"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP PROFILE PANEL ================= */}
      <div
        className={`hidden shrink-0 overflow-hidden border-l border-base-300 transition-[width] duration-300 ease-out md:block ${
          showProfile ? "w-80" : "w-0"
        }`}
      >
        <div className="h-full w-80">
          <ChatProfilePanel
            contact={receiver}
            isOnline={isOnline}
            sharedLinks={sharedLinks}
            onClose={() => setShowProfile(false)}
            onSearchInConversation={handleSearchFromProfile}
          />
        </div>
      </div>

      {/* ================= MOBILE PROFILE TAKEOVER ================= */}
      <div
        className={`fixed inset-0 z-50 bg-base-100 transition-transform duration-300 ease-out md:hidden ${
          showProfile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ChatProfilePanel
          contact={receiver}
          isOnline={isOnline}
          sharedLinks={sharedLinks}
          onClose={() => setShowProfile(false)}
          onSearchInConversation={handleSearchFromProfile}
          isMobile
        />
      </div>
    </div>
  );
};

export default ChatWindow;
