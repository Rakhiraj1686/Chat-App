
import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdOutlineChat } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

/* =========================================================
   QUICK NAVIGATION RAIL
   ========================================================= */

const RailButton = ({
  active = false,
  onClick,
  title,
  children,
  badge,
}) => {
  return (
    <div className="group relative">
      {/* Tooltip */}
      <div
        className="
          pointer-events-none absolute left-[calc(100%+14px)] top-1/2
          z-50 -translate-y-1/2 translate-x-1
          whitespace-nowrap rounded-lg
          border border-neutral-content/10
          bg-neutral px-2.5 py-1.5
          text-[11px] font-medium text-neutral-content
          opacity-0 shadow-xl
          transition-all duration-150
          group-hover:translate-x-0 group-hover:opacity-100
        "
      >
        {title}
      </div>

      <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        aria-pressed={active}
        className={`
          relative flex h-11 w-11 items-center justify-center
          rounded-xl text-[21px]
          transition-all duration-200
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
          focus-visible:ring-offset-neutral

          ${
            active
              ? `
                bg-primary
                text-primary-content
                shadow-lg shadow-primary/25
                scale-[1.02]
              `
              : `
                text-neutral-content/45
                hover:bg-neutral-content/10
                hover:text-neutral-content
                hover:scale-[1.04]
              `
          }
        `}
      >
        {/* Active indicator */}
        {active && (
          <span
            className="
              absolute -left-[9px]
              h-5 w-1
              rounded-r-full
              bg-primary
              shadow-[0_0_12px_rgba(255,255,255,0.15)]
            "
          />
        )}

        {children}

        {/* Optional notification badge */}
        {badge ? (
          <span
            className="
              absolute -right-0.5 -top-0.5
              flex h-4 min-w-4 items-center
              justify-center rounded-full
              border-2 border-neutral
              bg-error px-1
              text-[8px] font-bold
              text-error-content
            "
          >
            {badge}
          </span>
        ) : null}
      </button>
    </div>
  );
};

/* =========================================================
   BRAND MARK
   ========================================================= */

const BrandMark = () => {
  return (
    <div
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl bg-primary
        text-primary-content
        shadow-lg shadow-primary/20
      "
      aria-label="DostiHub"
    >
      <TiMessages className="text-2xl" />
    </div>
  );
};

/* =========================================================
   QUICK NAVIGATION
   ========================================================= */

const QuickNevigation = ({
  setFetchMode,
  fetchMode,
  setActivePage,
  activePage,
}) => {
  const navigate = useNavigate();

  const goToContacts = (mode) => {
    setFetchMode(mode);
    setActivePage("contacts");
  };

  const goToSettings = () => {
    setActivePage("settings");
  };

  const goToProfile = () => {
    navigate("/userDashboard");
  };

  return (
    <aside
      className="
        relative flex h-full w-[72px] shrink-0
        flex-col items-center
        border-r border-neutral-content/5
        bg-neutral
        py-4
      "
      aria-label="Quick navigation"
    >
      {/* =================================================
          TOP
         ================================================= */}

      <div className="flex flex-col items-center">
        <BrandMark />

        {/* Divider */}
        <div className="my-5 h-px w-8 bg-neutral-content/10" />

        <div className="flex flex-col items-center gap-2">
          {/* Recent Chats */}
          <RailButton
            active={activePage === "contacts" && fetchMode === "RC"}
            onClick={() => goToContacts("RC")}
            title="Recent chats"
          >
            <TiMessages />
          </RailButton>

          {/* All Contacts */}
          <RailButton
            active={activePage === "contacts" && fetchMode === "AC"}
            onClick={() => goToContacts("AC")}
            title="All contacts"
          >
            <MdOutlineChat />
          </RailButton>
        </div>
      </div>

      {/* =================================================
          BOTTOM
         ================================================= */}

      <div className="flex flex-col items-center gap-2">
        {/* Settings */}
        <RailButton
          active={activePage === "settings"}
          onClick={goToSettings}
          title="Settings"
        >
          <IoSettingsOutline size={21} />
        </RailButton>

        {/* Profile */}
        <RailButton
          active={false}
          onClick={goToProfile}
          title="Profile"
        >
          <CgProfile size={21} />
        </RailButton>
      </div>
    </aside>
  );
};

export default QuickNevigation;
