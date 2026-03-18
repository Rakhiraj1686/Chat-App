import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdOutlineChat } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const QuickNavigation = ({ setFetchMode, fetchMode, setActivePage = () => {} }) => {
  const navigate = useNavigate();

  const baseBtnClass =
    "flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-all duration-200";
  const activeBtnClass = "bg-primary text-primary-content shadow-sm";
  const idleBtnClass = "bg-base-100 text-base-content/75 hover:bg-base-300";

  return (
    <div className="h-full bg-linear-to-b from-base-200 to-base-100 p-2">
      <div className="flex h-full flex-col justify-between rounded-xl border border-base-300 bg-base-100/90 p-2 shadow-sm">
      {/* TOP ICONS */}
      <div className="flex flex-col items-center gap-3">
        <button
          className={`${baseBtnClass} ${fetchMode === "RC" ? activeBtnClass : idleBtnClass}`}
          onClick={() => {
            setFetchMode("RC");
            setActivePage("contacts");
          }}
          title="Recent Chats"
        >
          <TiMessages />
        </button>

        <button
          className={`${baseBtnClass} ${fetchMode === "AC" ? activeBtnClass : idleBtnClass}`}
          onClick={() => {
            setFetchMode("AC");
            setActivePage("contacts");
          }}
          title="All Contacts"
        >
          <MdOutlineChat />
        </button>
      </div>

      {/* PROFILE */}
      <div className="flex flex-col items-center gap-3 p-1">
        <button
          onClick={() => setActivePage("settings")}
          className={`${baseBtnClass} ${idleBtnClass} hover:rotate-45`}
          title="Settings"
        >
          <IoSettingsOutline size={22} />
        </button>

        <button
          onClick={() => {
            navigate("/userDashboard");
          }}
          className={`${baseBtnClass} ${idleBtnClass}`}
          title="Profile"
        >
          <CgProfile size={22} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default QuickNavigation;
