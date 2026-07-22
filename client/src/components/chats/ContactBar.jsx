import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import socketAPI from "../../config/WebSocket.jsx";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUsers,
} from "react-icons/hi2";

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
    <aside className="flex h-full min-h-0 flex-col bg-base-200">
      <div className="flex h-full min-h-0 flex-col bg-base-100">

        {/* ================= HEADER ================= */}
        <div className="border-b border-base-300 px-4 py-3">

          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content">
                {fetchMode === "RC" ? (
                  <HiOutlineChatBubbleLeftRight className="text-xl" />
                ) : (
                  <HiOutlineUsers className="text-xl" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-base-content">
                  {modeTitle}
                </h2>

                <p className="hidden text-xs text-base-content/60 sm:block">
                  Find people and start chatting
                </p>
              </div>
            </div>

            {/* MOBILE PROFILE + SETTINGS */}
            <div className="flex items-center gap-1 md:hidden">

              <button
                type="button"
                onClick={() => navigate("/userDashboard")}
                className="btn btn-circle btn-ghost btn-sm"
                title="Profile"
              >
                <MdPerson className="text-xl" />
              </button>

              <button
                type="button"
                onClick={() => setActivePage("settings")}
                className="btn btn-circle btn-ghost btn-sm"
                title="Settings"
              >
                <MdSettings className="text-xl" />
              </button>

            </div>

            <span className="badge badge-primary badge-outline hidden font-bold sm:flex">
              {contacts.length}
            </span>
          </div>

          {/* ================= SEARCH ================= */}
          <div className="mt-4 flex h-11 items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 focus-within:border-primary">

            <MdSearch className="shrink-0 text-xl text-base-content/50" />

            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/50"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-base-300"
              >
                <MdClose className="text-lg" />
              </button>
            )}

          </div>
        </div>

        {/* ================= CONTACT LIST ================= */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          {/* LOADING */}
          {loading && (
            <div className="space-y-1">

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-3 border-b border-base-300 px-4 py-3"
                >
                  <div className="h-12 w-12 rounded-full bg-base-300" />

                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-base-300" />
                    <div className="h-2 w-1/2 rounded bg-base-300" />
                  </div>
                </div>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredContacts.length === 0 && (
            <div className="flex h-full min-h-60 flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                {searchTerm ? "🔍" : "👥"}
              </div>

              <h3 className="mt-4 font-bold text-base-content">
                {searchTerm
                  ? "No contacts found"
                  : "No contacts available"}
              </h3>

              <p className="mt-2 text-sm text-base-content/60">
                {searchTerm
                  ? "Try searching with another name."
                  : "There are no contacts available right now."}
              </p>

            </div>
          )}

          {/* CONTACTS */}
          {!loading && filteredContacts.length > 0 && (
            <div>

              {filteredContacts.map((contact) => {

                const isSelected =
                  selectedContactId === contact._id;

                const isOnline =
                  onlineUsers?.[contact._id];

                return (
                  <button
                    type="button"
                    key={contact._id}
                    onClick={() => handleSelectContact(contact)}
                    className={`flex w-full items-center gap-3 border-b border-base-300 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "bg-primary/10"
                        : "hover:bg-base-200"
                    }`}
                  >

                    {/* AVATAR */}
                    <div className="relative shrink-0">

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                          isSelected
                            ? "bg-primary text-primary-content"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {getInitials(contact.fullName)}
                      </div>

                      {isOnline && (
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-base-100 bg-success" />
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-2">

                        <h3 className="truncate text-sm font-bold text-base-content">
                          {contact.fullName}
                        </h3>

                        {isOnline && (
                          <span className="hidden items-center gap-1 text-[10px] font-semibold text-success sm:flex">
                            <GoDotFill />
                            Online
                          </span>
                        )}

                      </div>

                      <p className="mt-1 truncate text-xs text-base-content/60">
                        {contact.mobileNumber ||
                          "Available to chat"}
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
            className="btn btn-outline btn-sm w-full"
          >
            <MdRefresh
              className={loading ? "animate-spin" : ""}
            />

            Refresh Contacts
          </button>

        </div>

      </div>
    </aside>
  );
};

export default ContactBar;