import React, { useEffect, useState } from "react";
import QuickNevigation from "../components/chats/QuickNevigation";
import ContactBar from "../components/chats/ContactBar";
import ChatWindow from "../components/chats/ChatWindow";
import Settings from "../components/chats/Settings";
import { useAuth } from "../context/AuthContext";
import socketAPI from "../config/WebSocket.jsx";
import { useNavigate } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { MdOutlineChat, MdPerson } from "react-icons/md";

const MobileTabBar = ({ fetchMode, setFetchMode, onProfile }) => {
  const tabs = [
    { key: "RC", label: "Chats", icon: TiMessages, onClick: () => setFetchMode("RC") },
    { key: "AC", label: "Contacts", icon: MdOutlineChat, onClick: () => setFetchMode("AC") },
    { key: "profile", label: "Profile", icon: MdPerson, onClick: onProfile },
  ];

  return (
    <nav className="flex shrink-0 border-t border-base-300 bg-base-100 md:hidden">
      {tabs.map((tab) => {
        const active = fetchMode === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={tab.onClick}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              active ? "text-primary" : "text-base-content/50"
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

const Chating = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fetchMode, setFetchMode] = useState("AC");
  const [receiver, setReceiver] = useState(null);
  const [activePage, setActivePage] = useState("contacts");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    socketAPI.emit("createPath", user._id);

    return () => {
      socketAPI.emit("destroyPath", user._id);
    };
  }, [user, navigate]);

  const handleSelectContact = (contact) => {
    setReceiver(contact);
  };

  const handleBackToContacts = () => {
    setReceiver(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-base-200 p-1 sm:p-2">
      <div className="flex h-full overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden w-[5%] min-w-15 overflow-hidden border-r border-base-300 md:block">
          <QuickNevigation
            setFetchMode={setFetchMode}
            fetchMode={fetchMode}
            setActivePage={setActivePage}
            activePage={activePage}
          />
        </div>

        {/* ================= SETTINGS ================= */}
        {activePage === "settings" ? (
          <div className="flex-1 overflow-hidden">
            <Settings setActivePage={setActivePage} />
          </div>
        ) : (
          <>
            {/* ================= MOBILE CONTACT BAR ================= */}
            <div
              className={`flex h-full w-full flex-col overflow-hidden md:hidden ${
                receiver ? "hidden" : "flex"
              }`}
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <ContactBar
                  fetchMode={fetchMode}
                  setReceiver={handleSelectContact}
                  setActivePage={setActivePage}
                />
              </div>
              <MobileTabBar
                fetchMode={fetchMode}
                setFetchMode={setFetchMode}
                onProfile={() => navigate("/userDashboard")}
              />
            </div>

            {/* ================= DESKTOP CONTACT BAR ================= */}
            <div className="hidden w-[20%] min-w-60 overflow-hidden border-r border-base-300 md:block">
              <ContactBar
                fetchMode={fetchMode}
                setReceiver={handleSelectContact}
                setActivePage={setActivePage}
              />
            </div>

            {/* ================= CHAT WINDOW ================= */}
            <div
              className={`h-full w-full overflow-hidden md:flex-1 ${
                receiver ? "block" : "hidden md:block"
              }`}
            >
              <ChatWindow
                receiver={receiver}
                onBack={handleBackToContacts}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chating;