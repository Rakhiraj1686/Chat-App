import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import socketAPI from "../../config/WebSocket.jsx";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  MdSearch,
  MdRefresh,
  MdClose,
  MdSettings,
  MdPerson,
} from "react-icons/md";

const ContactBar = ({
  fetchMode,
  setReceiver,
  setActivePage,
}) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const modeTitle = fetchMode === "RC" ? "Recent Chats" : "All Contacts";

  const fetchContacts = async () => {
    setLoading(true);

    try {
      const response =
        fetchMode === "RC"
          ? await api.get("/user/recentUsers")
          : await api.get("/user/allUsers");

      setContacts(response?.data?.data || []);
    } catch (error) {
      if (error?.response?.status === 401) {
        sessionStorage.removeItem("AppUser");
        setUser(null);
        setIsLogin(false);

        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      toast.error(
        error?.response?.data?.message ||
          "Failed to load contacts. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchMode]);

  useEffect(() => {
    const handleOnlineUsers = (onlineList) => {
      setOnlineUsers(onlineList || {});
    };

    socketAPI.on("onlineUsers", handleOnlineUsers);

    return () => {
      socketAPI.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  const handleSelectContact = (contact) => {
    setSelectedContactId(contact._id);
    setReceiver(contact);
  };

  return (
    <aside className="flex h-full min-h-0 flex-col bg-base-100">
      {/* ================= HEADER ================= */}
      <div className="border-b border-base-300 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display truncate text-xl font-semibold text-base-content">
              {modeTitle}
            </h2>
            <p className="mt-0.5 text-xs text-base-content/50">
              {contacts.length} {contacts.length === 1 ? "person" : "people"}
            </p>
          </div>

          {/* MOBILE PROFILE + SETTINGS */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/userDashboard")}
              className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/60 hover:bg-base-200"
              title="Profile"
            >
              <MdPerson className="text-xl" />
            </button>

            <button
              type="button"
              onClick={() => setActivePage("settings")}
              className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/60 hover:bg-base-200"
              title="Settings"
            >
              <MdSettings className="text-xl" />
            </button>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mt-4 flex h-11 items-center gap-2 rounded-field border border-base-300 bg-base-200/60 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
          <MdSearch className="shrink-0 text-lg text-base-content/40" />

          <input
            type="text"
            placeholder="Search contacts"
            aria-label="Search contacts"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/45"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-base-300"
              aria-label="Clear search"
            >
              <MdClose className="text-base" />
            </button>
          )}
        </div>
      </div>

      {/* ================= CONTACT LIST ================= */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* LOADING */}
        {loading && (
          <div className="space-y-1 p-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex animate-pulse items-center gap-3 px-2 py-3">
                <div className="h-11 w-11 rounded-full bg-base-300" />
                <div className="flex-1 space-y-2">
                  <div className="h-2.5 w-2/3 rounded bg-base-300" />
                  <div className="h-2 w-1/2 rounded bg-base-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredContacts.length === 0 && (
          <div className="flex h-full min-h-60 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              {searchTerm ? "🔍" : "👋"}
            </div>
            <h3 className="font-display mt-4 font-semibold text-base-content">
              {searchTerm ? "No matches" : "Nobody here yet"}
            </h3>
            <p className="mt-1.5 text-sm text-base-content/55">
              {searchTerm
                ? "Try a different name."
                : "There's no one to show in this list right now."}
            </p>
          </div>
        )}

        {/* CONTACTS */}
        {!loading && filteredContacts.length > 0 && (
          <div className="px-2 py-1">
            {filteredContacts.map((contact) => {
              const isSelected = selectedContactId === contact._id;
              const isOnline = onlineUsers?.[contact._id];

              return (
                <button
                  type="button"
                  key={contact._id}
                  onClick={() => handleSelectContact(contact)}
                  className={`flex w-full items-center gap-3 rounded-field px-2.5 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-primary/10" : "hover:bg-base-200"
                  }`}
                >
                  {/* AVATAR */}
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                        isSelected
                          ? "bg-primary text-primary-content"
                          : "bg-neutral text-neutral-content"
                      }`}
                    >
                      {getInitials(contact.fullName)}
                    </div>

                    {isOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-100 bg-success" />
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-base-content">
                        {contact.fullName}
                      </h3>
                      {isOnline && (
                        <span className="hidden items-center gap-1 text-[10px] font-medium text-success sm:flex">
                          <GoDotFill />
                          Online
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 truncate text-xs text-base-content/50">
                      {contact.mobileNumber || "Available to chat"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t border-base-300 p-3">
        <button
          type="button"
          onClick={fetchContacts}
          disabled={loading}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-field border border-base-300 text-sm font-medium text-base-content/70 transition hover:bg-base-200 disabled:opacity-60"
        >
          <MdRefresh className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
    </aside>
  );
};

export default ContactBar;