import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdOutlineChat } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// This rail is always the dark "ink" surface, in both light and dark theme —
// it's the one bold, consistent structural element that anchors the brand
// wherever you are in the app, the way a physical object would.
const RailButton = ({ active, onClick, title, children, className = "" }) => (
  <button
    onClick={onClick}
    title={title}
    aria-label={title}
    aria-pressed={active}
    className={`group relative flex h-11 w-11 items-center justify-center rounded-field text-xl transition-colors duration-150 ${
      active
        ? "bg-primary text-primary-content"
        : "text-neutral-content/50 hover:bg-neutral-content/10 hover:text-neutral-content"
    } ${className}`}
  >
    {active && (
      <span className="absolute -left-2 h-5 w-1 rounded-full bg-primary" />
    )}
    {children}
  </button>
);

const QuickNevigation = ({ setFetchMode, fetchMode, setActivePage, activePage }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-between bg-neutral py-4">
      {/* TOP */}
      <div className="flex flex-col items-center gap-2">
        <RailButton
          active={activePage === "contacts" && fetchMode === "RC"}
          onClick={() => {
            setFetchMode("RC");
            setActivePage("contacts");
          }}
          title="Recent chats"
        >
          <TiMessages />
        </RailButton>

        <RailButton
          active={activePage === "contacts" && fetchMode === "AC"}
          onClick={() => {
            setFetchMode("AC");
            setActivePage("contacts");
          }}
          title="All contacts"
        >
          <MdOutlineChat />
        </RailButton>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-2">
        <RailButton
          active={activePage === "settings"}
          onClick={() => setActivePage("settings")}
          title="Settings"
        >
          <IoSettingsOutline size={21} />
        </RailButton>

        <RailButton
          active={false}
          onClick={() => navigate("/userDashboard")}
          title="Profile"
        >
          <CgProfile size={21} />
        </RailButton>
      </div>
    </div>
  );
};

export default QuickNevigation;
