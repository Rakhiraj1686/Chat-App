import React, { useState } from "react";
import QuickNevigation from "../components/chats/QuickNevigation";
import ContactBar from "../components/chats/ContactBar";
import ChatWindow from "../components/chats/ChatWindow";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import socketAPI from "../config/WebSocket";
import { useNavigate } from "react-router-dom";

const Chating = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fetchMode, setFetchMode] = useState("AC");

  const [receiver, setReceiver] = useState(null);

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

  return (
    <>
      <div className="h-[92vh] bg-base-200 p-2">
        <div className="flex h-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm">
        <div className="w-1/20 border-r border-base-300 overflow-hidden">
          <QuickNevigation setFetchMode={setFetchMode} fetchMode={fetchMode} />
        </div>
        <div className="w-4/20 border-r border-base-300 overflow-hidden">
          <ContactBar fetchMode={fetchMode} setReceiver={setReceiver} />
        </div>
        <div className="w-15/20 overflow-hidden">
          <ChatWindow receiver={receiver} />
        </div>
        </div>
      </div>
    </>
  );
};

export default Chating;