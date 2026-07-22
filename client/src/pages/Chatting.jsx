import React, { useEffect, useState } from "react";
import QuickNevigation from "../components/chats/QuickNevigation";
import ContactBar from "../components/chats/ContactBar";
import ChatWindow from "../components/chats/ChatWindow";
import Settings from "../components/chats/Settings";
import { useAuth } from "../context/AuthContext";
import socketAPI from "../config/WebSocket.jsx";
import { useNavigate } from "react-router-dom";

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
      <div className="flex h-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm">

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden w-[5%] min-w-[60px] overflow-hidden border-r border-base-300 md:block">
          <QuickNevigation
            setFetchMode={setFetchMode}
            fetchMode={fetchMode}
            setActivePage={setActivePage}
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
              className={`h-full w-full overflow-hidden md:hidden ${
                receiver ? "hidden" : "block"
              }`}
            >
              <ContactBar
                fetchMode={fetchMode}
                setReceiver={handleSelectContact}
                setActivePage={setActivePage}
              />
            </div>

            {/* ================= DESKTOP CONTACT BAR ================= */}
            <div className="hidden w-[20%] min-w-[240px] overflow-hidden border-r border-base-300 md:block">
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