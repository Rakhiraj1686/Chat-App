
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import socketAPI from "../../config/WebSocket.jsx";

import {
  FaSmile,
  FaPaperclip,
} from "react-icons/fa";

import {
  IoArrowBack,
  IoSend,
  IoSearchOutline,
  IoClose,
  IoChevronUp,
  IoChevronDown,
  IoCallOutline,
  IoVideocamOutline,
  IoEllipsisVertical,
  IoCheckmarkDone,
} from "react-icons/io5";

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

const formatDate = (iso) => {
  if (!iso) return "";

  try {
    return new Date(iso).toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
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

const URL_PATTERN = /\bhttps?:\/\/[^\s<>"')]+/gi;

const extractLinks = (messages) => {
  const found = new Set();

  messages.forEach((chat) => {
    const matches = chat.message?.match(URL_PATTERN);

    matches?.forEach((url) =>
      found.add(url.replace(/[.,;]+$/, ""))
    );
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

  const [isSending, setIsSending] = useState(false);

  const isOnline = Boolean(
    receiverId && onlineUsers?.[receiverId]
  );

  const firstName =
    receiver?.fullName?.split(" ")?.[0] || "friend";

  /* =========================================================
     SCROLL
  ========================================================= */

  const scrollToBottom = (behavior = "smooth") => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior,
        block: "end",
      });
    }, 50);
  };

  useEffect(() => {
    if (!showSearch) {
      scrollToBottom("smooth");
    }
  }, [messages, showSearch]);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const handleSend = async () => {
    if (!senderId) {
      toast.error("Please login again to send messages.");
      return;
    }

    if (!receiverId) {
      toast.error("This contact cannot receive messages yet.");
      return;
    }

    const message = inputMessage.trim();

    if (!message || isSending) {
      return;
    }

    const messagePacket = {
      senderId,
      receiverId,
      message,
    };

    const timestamp = new Date().toISOString();

    try {
      setIsSending(true);

      if (!socketAPI.connected) {
        toast.error(
          "Connection lost. Please refresh and try again."
        );
        return;
      }

      socketAPI.emit("send", messagePacket);

      setInputMessage("");
      setShowEmoji(false);

      setMessages((prev) => [
        ...prev,
        {
          ...messagePacket,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Message sending failed"
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* =========================================================
     FETCH MESSAGES
  ========================================================= */

  const fetchAllOldMessage = async () => {
    if (!receiverId) {
      setMessages([]);
      return;
    }

    try {
      const res = await api.get(
        `/user/fetchMessages/${receiverId}`
      );

      setMessages(res.data.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error fetching messages"
      );
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  /* =========================================================
     SOCKET RECEIVE
  ========================================================= */

  const handleReceiveMessage = (newMessagePack) => {
    const isCurrentChat =
      (newMessagePack.senderId === receiverId &&
        newMessagePack.receiverId === senderId) ||
      (newMessagePack.senderId === senderId &&
        newMessagePack.receiverId === receiverId);

    if (isCurrentChat) {
      setMessages((prev) => [
        ...prev,
        newMessagePack,
      ]);
    }
  };

  useEffect(() => {
    socketAPI.on(
      "receive",
      handleReceiveMessage
    );

    return () => {
      socketAPI.off(
        "receive",
        handleReceiveMessage
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId, senderId]);

  /* =========================================================
     ONLINE USERS
  ========================================================= */

  useEffect(() => {
    const handleOnlineUsers = (users) => {
      setOnlineUsers(users || {});
    };

    socketAPI.on(
      "onlineUsers",
      handleOnlineUsers
    );

    return () => {
      socketAPI.off(
        "onlineUsers",
        handleOnlineUsers
      );
    };
  }, []);

  /* =========================================================
     EMOJI
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = () => {
      setShowEmoji(false);
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     FILE
  ========================================================= */

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      toast.success(
        `File selected: ${file.name}`
      );
    }

    e.target.value = "";
  };

  /* =========================================================
     PROFILE
  ========================================================= */

  const sharedLinks = useMemo(
    () => extractLinks(messages),
    [messages]
  );

  const openProfile = () => {
    setShowEmoji(false);
    setShowProfile(true);
  };

  const handleSearchFromProfile = () => {
    setShowProfile(false);
    setShowSearch(true);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const matchingIds = useMemo(() => {
    const term = searchTerm
      .trim()
      .toLowerCase();

    if (!term) return [];

    return messages
      .map((chat, idx) => ({
        chat,
        idx,
      }))
      .filter(({ chat }) =>
        chat.message
          ?.toLowerCase()
          .includes(term)
      )
      .map(
        ({ chat, idx }) =>
          chat._id || `idx-${idx}`
      );
  }, [messages, searchTerm]);

  useEffect(() => {
    setActiveMatchIdx(0);
  }, [searchTerm]);

  useEffect(() => {
    if (!matchingIds.length) return;

    const targetId =
      matchingIds[activeMatchIdx] ||
      matchingIds[0];

    messageRefs.current[
      targetId
    ]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeMatchIdx, matchingIds]);

  const jumpMatch = (direction) => {
    if (!matchingIds.length) return;

    setActiveMatchIdx(
      (prev) =>
        (prev +
          direction +
          matchingIds.length) %
        matchingIds.length
    );
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!receiver) {
    return (
      <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-base-200 px-6">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative z-10 max-w-sm text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-primary/10 text-primary shadow-inner">
            <span className="text-4xl">💬</span>
          </div>

          <h2 className="font-display mt-6 text-2xl font-bold">
            Start a conversation
          </h2>

          <p className="mt-3 text-sm leading-6 text-base-content/50">
            Choose someone from your contacts and
            start chatting. Your conversations will
            appear here.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="relative flex h-full min-w-0 flex-1 overflow-hidden bg-base-200">

      {/* =====================================================
          CHAT AREA
      ===================================================== */}

      <div className="flex h-full min-w-0 flex-1 flex-col">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="relative z-20 flex shrink-0 items-center gap-2 border-b border-base-300 bg-base-100/95 px-3 py-2.5 backdrop-blur-xl sm:px-4">

          {/* Mobile back */}

          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base-content/60 transition hover:bg-base-200 hover:text-base-content md:hidden"
            aria-label="Back"
          >
            <IoArrowBack className="text-xl" />
          </button>

          {/* Profile */}

          <button
            type="button"
            onClick={openProfile}
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1.5 py-1 text-left transition hover:bg-base-200"
          >

            <div className="relative shrink-0">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral text-sm font-bold text-neutral-content shadow-sm">
                {getInitials(
                  receiver.fullName
                )}
              </div>

              {isOnline && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] border-base-100 bg-success" />
              )}
            </div>

            <div className="min-w-0">

              <h2 className="truncate text-sm font-bold sm:text-[15px]">
                {receiver.fullName}
              </h2>

              <div className="mt-0.5 flex items-center gap-1.5">

                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isOnline
                      ? "bg-success"
                      : "bg-base-content/25"
                  }`}
                />

                <p
                  className={`text-[11px] font-medium ${
                    isOnline
                      ? "text-success"
                      : "text-base-content/40"
                  }`}
                >
                  {isOnline
                    ? "Active now"
                    : "Offline"}
                </p>
              </div>
            </div>
          </button>

          {/* Actions */}

          <div className="flex shrink-0 items-center gap-0.5">

            <button
              type="button"
              onClick={() =>
                setShowSearch((prev) => !prev)
              }
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                showSearch
                  ? "bg-primary/10 text-primary"
                  : "text-base-content/50 hover:bg-base-200 hover:text-base-content"
              }`}
              aria-label="Search"
            >
              <IoSearchOutline className="text-lg" />
            </button>

            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-xl text-base-content/50 transition hover:bg-base-200 hover:text-base-content sm:flex"
              aria-label="Voice call"
              onClick={() =>
                toast("Voice calls coming soon")
              }
            >
              <IoCallOutline className="text-lg" />
            </button>

            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-xl text-base-content/50 transition hover:bg-base-200 hover:text-base-content sm:flex"
              aria-label="Video call"
              onClick={() =>
                toast("Video calls coming soon")
              }
            >
              <IoVideocamOutline className="text-lg" />
            </button>

            <button
              type="button"
              onClick={openProfile}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-base-content/50 transition hover:bg-base-200 hover:text-base-content"
              aria-label="More options"
            >
              <IoEllipsisVertical className="text-lg" />
            </button>

          </div>
        </header>

        {/* ===================================================
            SEARCH
        =================================================== */}

        {showSearch && (
          <div className="relative z-10 border-b border-base-300 bg-base-100 px-3 py-2.5 sm:px-4">

            <div className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-200/60 px-3 py-2">

              <IoSearchOutline className="shrink-0 text-base-content/40" />

              <input
                autoFocus
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder={`Search messages with ${firstName}...`}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/40"
              />

              {searchTerm && (
                <span className="hidden shrink-0 text-[11px] font-medium text-base-content/40 sm:block">
                  {matchingIds.length
                    ? `${activeMatchIdx + 1}/${matchingIds.length}`
                    : "No results"}
                </span>
              )}

              <button
                type="button"
                onClick={() => jumpMatch(-1)}
                disabled={!matchingIds.length}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-base-300 disabled:opacity-30"
                aria-label="Previous"
              >
                <IoChevronUp />
              </button>

              <button
                type="button"
                onClick={() => jumpMatch(1)}
                disabled={!matchingIds.length}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-base-300 disabled:opacity-30"
                aria-label="Next"
              >
                <IoChevronDown />
              </button>

              <button
                type="button"
                onClick={closeSearch}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-base-content/50 hover:bg-base-300"
                aria-label="Close"
              >
                <IoClose />
              </button>

            </div>
          </div>
        )}

        {/* ===================================================
            MESSAGES
        =================================================== */}

        <div className="relative flex-1 overflow-y-auto bg-base-200">

          {/* subtle background */}

          <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-full max-w-4xl flex-col px-3 py-5 sm:px-5 md:px-7">

            {/* conversation date */}

            {messages.length > 0 && (
              <div className="mb-5 flex justify-center">
                <span className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-base-content/40 shadow-sm">
                  {formatDate(
                    messages[0]?.createdAt
                  )}
                </span>
              </div>
            )}

            {messages.length > 0 ? (

              <div className="space-y-2">

                {messages.map(
                  (chat, idx) => {

                    const isReceived =
                      chat.senderId ===
                      receiverId;

                    const msgId =
                      chat._id ||
                      `idx-${idx}`;

                    const isMatch =
                      matchingIds.includes(
                        msgId
                      );

                    const isActiveMatch =
                      isMatch &&
                      matchingIds[
                        activeMatchIdx
                      ] === msgId;

                    const previousMessage =
                      messages[idx - 1];

                    const sameSender =
                      previousMessage &&
                      previousMessage.senderId ===
                        chat.senderId;

                    return (
                      <div
                        key={msgId}
                        ref={(el) => {
                          messageRefs.current[
                            msgId
                          ] = el;
                        }}
                        className={`message-in flex ${
                          isReceived
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >

                        {/* Received avatar */}

                        {isReceived &&
                          !sameSender && (
                            <div className="mr-2 hidden self-end pb-5 sm:block">

                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral text-[9px] font-bold text-neutral-content">
                                {getInitials(
                                  receiver.fullName
                                )}
                              </div>

                            </div>
                          )}

                        <div
                          className={`flex max-w-[88%] flex-col ${
                            isReceived
                              ? "items-start"
                              : "items-end"
                          } sm:max-w-[75%]`}
                        >

                          <div
                            className={`group relative rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm transition ${
                              isReceived
                                ? "rounded-bl-md bg-base-100 text-base-content"
                                : "rounded-br-md bg-primary text-primary-content shadow-primary/10"
                            } ${
                              isActiveMatch
                                ? "ring-2 ring-warning ring-offset-2 ring-offset-base-200"
                                : isMatch
                                ? "ring-2 ring-warning/40"
                                : ""
                            }`}
                          >
                            <p className="wrap-break-word whitespace-pre-wrap">
                              {chat.message}
                            </p>

                            <div
                              className={`mt-1 flex items-center gap-1 ${
                                isReceived
                                  ? "text-base-content/35"
                                  : "text-primary-content/60"
                              }`}
                            >
                              <span className="text-[10px]">
                                {formatTime(
                                  chat.createdAt
                                )}
                              </span>

                              {!isReceived && (
                                <IoCheckmarkDone className="text-[12px]" />
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <div className="flex flex-1 items-center justify-center py-20">

                <div className="max-w-xs text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="text-3xl">
                      👋
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    Say hello to {firstName}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-base-content/45">
                    Start the conversation and
                    make the first move.
                  </p>

                </div>
              </div>
            )}

            <div
              ref={bottomRef}
              className="h-2 shrink-0"
            />

          </div>
        </div>

        {/* ===================================================
            EMOJI PICKER
        =================================================== */}

        {showEmoji && (
          <div
            className="absolute bottom-[76px] left-3 z-50 overflow-hidden rounded-2xl shadow-2xl sm:left-5"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setInputMessage(
                  (prev) =>
                    prev + emojiData.emoji
                );

                setShowEmoji(false);
              }}
              height={350}
              width={300}
            />
          </div>
        )}

        {/* ===================================================
            COMPOSER
        =================================================== */}

        <div className="shrink-0 border-t border-base-300 bg-base-100 px-3 py-3 sm:px-5 sm:py-3.5">

          <div className="mx-auto flex max-w-4xl items-end gap-2">

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmoji(
                  (prev) => !prev
                );
              }}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                showEmoji
                  ? "bg-primary/10 text-primary"
                  : "text-base-content/45 hover:bg-base-200 hover:text-base-content"
              }`}
              aria-label="Emoji"
            >
              <FaSmile className="text-lg" />
            </button>

            <button
              type="button"
              onClick={handleFileClick}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base-content/45 transition hover:bg-base-200 hover:text-base-content"
              aria-label="Attach file"
            >
              <FaPaperclip className="text-base" />
            </button>

            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-2xl border border-base-300 bg-base-200/60 px-4 transition focus-within:border-primary focus-within:bg-base-100 focus-within:ring-2 focus-within:ring-primary/10">

              <input
                type="text"
                value={inputMessage}
                placeholder={`Message ${firstName}...`}
                aria-label="Message"
                onChange={(e) =>
                  setInputMessage(
                    e.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-base-content/35"
              />

            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={
                !inputMessage.trim() ||
                isSending
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg shadow-primary/20 transition-all enabled:hover:-translate-y-0.5 enabled:hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Send message"
            >
              <IoSend className="ml-0.5 text-lg" />
            </button>

          </div>

          <p className="mx-auto mt-1.5 hidden max-w-4xl text-center text-[9px] text-base-content/25 sm:block">
            Press Enter to send
          </p>

        </div>
      </div>

      {/* =====================================================
          DESKTOP PROFILE
      ===================================================== */}

      <div
        className={`hidden shrink-0 overflow-hidden border-l border-base-300 bg-base-100 transition-[width] duration-300 ease-out md:block ${
          showProfile
            ? "w-[340px]"
            : "w-0"
        }`}
      >

        <div className="h-full w-[340px]">

          <ChatProfilePanel
            contact={receiver}
            isOnline={isOnline}
            sharedLinks={sharedLinks}
            onClose={() =>
              setShowProfile(false)
            }
            onSearchInConversation={
              handleSearchFromProfile
            }
          />

        </div>
      </div>

      {/* =====================================================
          MOBILE PROFILE
      ===================================================== */}

      <div
        className={`fixed inset-0 z-[100] bg-base-100 transition-transform duration-300 ease-out md:hidden ${
          showProfile
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <ChatProfilePanel
          contact={receiver}
          isOnline={isOnline}
          sharedLinks={sharedLinks}
          onClose={() =>
            setShowProfile(false)
          }
          onSearchInConversation={
            handleSearchFromProfile
          }
          isMobile
        />

      </div>
    </div>
  );
};

export default ChatWindow;

