import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdOutlineChat } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const QuickNavigation = ({ setFetchMode, fetchMode, setActivePage }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-info-content h-full flex flex-col justify-between">
      {/* TOP ICONS */}
      <div className="flex flex-col gap-4 items-center">
        <button
          className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-base-300 "
          onClick={() => {
            setFetchMode("RC");
            setActivePage("contacts");
          }}
        >
          <TiMessages />
        </button>

        <button
          className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-base-300 "
          onClick={() => {
            setFetchMode("AC");
            setActivePage("contacts");
          }}
        >
          <MdOutlineChat />
        </button>
      </div>

      {/* PROFILE */}
      <div className="p-2">
        <button
          onClick={() => setActivePage("settings")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-base-300 hover:animate-spin"
        >
          <IoSettingsOutline size={22} />
        </button>

        <button
          onClick={() => {
            navigate("/userDashboard");
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-base-300"
        >
          <CgProfile size={22} />
        </button>
      </div>
    </div>
  );
};

export default QuickNavigation;
