import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api.jsx";
import socketAPI from "../../config/WebSocket.jsx";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiOutlineChatBubbleLeftRight, HiOutlineUsers } from "react-icons/hi2";

const ContactBar = ({ fetchMode, setReceiver }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState();
  const [selectedContactId, setSelectedContactId] = useState(null);

  const modeTitle = fetchMode === "RC" ? "Recent Chats" : "All Contacts";
  const modeSubtitle =
    fetchMode === "RC"
      ? "People you talked with recently"
      : "Browse and start new conversations";

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let res;

      if (fetchMode === "RC") {
        res = await api.get("/user/recentUsers");
        setContacts(res.data.data || []);
      } else if (fetchMode === "AC") {
        res = await api.get("/user/allUsers");
        setContacts(res.data.data || []);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        sessionStorage.removeItem("AppUser");
        setUser(null);
        setIsLogin(false);
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      toast.error("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchMode]);

  const handleOnlineUsers = (onlineList) => {
    setOnlineUsers(onlineList);
  };

  useEffect(() => {
    socketAPI.on("onlineUsers", handleOnlineUsers);

    return () => {
      socketAPI.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  return (
    <div className="h-full bg-linear-to-b from-base-200 to-base-100 p-2">
      <div className="flex h-full flex-col gap-3 rounded-xl border border-base-300 bg-base-100/90 p-3 shadow-sm">
        <div className="rounded-lg border border-base-300 bg-base-200/70 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base-content">
              {fetchMode === "RC" ? (
                <HiOutlineChatBubbleLeftRight className="text-lg text-primary" />
              ) : (
                <HiOutlineUsers className="text-lg text-primary" />
              )}
              <h3 className="text-sm font-semibold tracking-wide">{modeTitle}</h3>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
              {contacts.length}
            </span>
          </div>
          <p className="mt-1 text-xs text-base-content/70">{modeSubtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loading && (
            <div className="flex h-full min-h-24 items-center justify-center rounded-lg border border-dashed border-base-300 text-sm text-base-content/70">
              Loading contacts...
            </div>
          )}

          {!loading && contacts.length === 0 && (
            <div className="flex h-full min-h-24 items-center justify-center rounded-lg border border-dashed border-base-300 px-3 text-center text-sm text-base-content/70">
              {fetchMode === "RC"
                ? "No recent chats yet. Start chatting from All Contacts."
                : "No contacts found."}
            </div>
          )}

          {!loading &&
            contacts.map((contact) => (
              <div
                key={contact._id}
                className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                  selectedContactId === contact._id
                    ? "border-primary bg-primary/10"
                    : "border-base-300 bg-base-100 hover:border-primary/40 hover:bg-base-200/70"
                }`}
                onClick={() => {
                  setSelectedContactId(contact._id);
                  setReceiver(contact);
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary text-center leading-10 text-xs font-bold text-primary-content shadow-sm">
                      {(contact.fullName || "U")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <h4 className="line-clamp-1 text-sm font-semibold text-base-content">
                      {contact.fullName}
                    </h4>
                  </div>

                  {onlineUsers && onlineUsers[contact._id] && (
                    <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
                      <GoDotFill className="text-xs" />
                      Online
                    </span>
                  )}
                </div>
                {contact.mobileNumber && (
                  <p className="mt-1 text-xs font-medium text-base-content/80">
                    {contact.mobileNumber}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
