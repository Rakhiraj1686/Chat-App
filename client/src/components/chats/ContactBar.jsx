import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import socketAPI from "../../config/WebSocket";
import { GoDotFill } from "react-icons/go";
import { FiSearch, FiUsers } from "react-icons/fi";

const ContactBar = ({ fetchMode, setReceiver }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const fetchContacts = async () => {
    // Simulate an API call with a delay
    setLoading(true);
    try {
      const res = await api.get("/user/allUsers");
      setContacts(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate fetching contacts from an API when the component mounts
    fetchContacts();
  }, [fetchMode]);

  const handleOnlineUsers = useCallback((onlineList) => {
    setOnlineUsers(onlineList || {});
  }, []);

  useEffect(() => {
    socketAPI.on("onlineUsers", handleOnlineUsers);

    return () => {
      socketAPI.off("onlineUsers", handleOnlineUsers);
    };
  }, [handleOnlineUsers]);

  const visibleContacts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) => {
      const fullName = contact.fullName?.toLowerCase() || "";
      const email = contact.email?.toLowerCase() || "";
      return fullName.includes(query) || email.includes(query);
    });
  }, [contacts, searchText]);

  if (loading) {
    return (
      <div className="h-full bg-linear-to-b from-base-100 to-base-200 p-3">
        <div className="animate-pulse space-y-3">
          <div className="h-12 rounded-xl bg-base-300" />
          <div className="h-10 rounded-xl bg-base-300" />
          <div className="h-20 rounded-xl bg-base-300" />
          <div className="h-20 rounded-xl bg-base-300" />
          <div className="h-20 rounded-xl bg-base-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-linear-to-b from-base-100 via-base-200 to-base-100 p-3 flex flex-col gap-3">
      <div className="rounded-2xl bg-base-100/80 backdrop-blur border border-base-300 px-3 py-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-base-content/60">
              {fetchMode === "RC" ? "Recent" : "All Contacts"}
            </p>
            <h2 className="text-lg font-bold text-base-content leading-tight">
              Messages
            </h2>
          </div>
          <div className="badge badge-primary badge-outline gap-1 px-2 py-3">
            <FiUsers />
            {contacts.length}
          </div>
        </div>

        <label className="input input-bordered input-sm mt-3 flex items-center gap-2 bg-base-100">
          <FiSearch className="text-base-content/60" />
          <input
            type="text"
            className="grow"
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      <div className="overflow-y-auto pr-1 space-y-2">
        {visibleContacts.length === 0 && (
          <div className="h-40 rounded-2xl border border-dashed border-base-300 bg-base-100/50 flex items-center justify-center text-sm text-base-content/60 text-center px-4">
            No contacts found for "{searchText}".
          </div>
        )}

        {visibleContacts.map((contact) => {
          const isSelected = selectedId === contact._id;
          const isOnline = Boolean(onlineUsers[contact._id]);

          return (
            <button
              type="button"
              key={contact._id}
              className={`w-full text-left rounded-2xl border px-3 py-2 transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow"
                  : "border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-sm"
              }`}
              onClick={() => {
                setSelectedId(contact._id);
                setReceiver(contact);
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-base-content truncate">
                    {contact.fullName}
                  </p>
                  <p className="text-xs text-base-content/70 truncate">
                    {contact.email}
                  </p>
                  <p className="text-sm text-base-content/90 mt-1">
                    {contact.mobileNumber || "No number"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs mt-1 shrink-0">
                  <GoDotFill
                    className={isOnline ? "text-green-500" : "text-base-300"}
                  />
                  <span className={isOnline ? "text-green-600" : "text-base-content/50"}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContactBar;
