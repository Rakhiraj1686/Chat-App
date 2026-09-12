
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  IoArrowBack,
  IoLogOutOutline,
  IoChevronForward,
  IoCheckmarkCircle,
  IoMoonOutline,
  IoSunnyOutline,
  IoDesktopOutline,
} from "react-icons/io5";
import { MdPalette } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

import { useAuth } from "../../context/AuthContext";
import {
  THEME_OPTIONS,
  getStoredThemePreference,
  setStoredThemePreference,
} from "../../config/theme";

/* =========================================================
   SETTING ROW
   ========================================================= */

const SettingRow = ({
  icon,
  title,
  description,
  children,
  danger = false,
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            ${
              danger
                ? "bg-error/10 text-error"
                : "bg-primary/10 text-primary"
            }
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-base-content">
            {title}
          </h3>

          <p className="mt-1 max-w-md text-xs leading-5 text-base-content/50">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

/* =========================================================
   THEME ICON
   ========================================================= */

const getThemeIcon = (value) => {
  if (value === "dark") {
    return <IoMoonOutline />;
  }

  if (value === "light") {
    return <IoSunnyOutline />;
  }

  return <IoDesktopOutline />;
};

/* =========================================================
   SETTINGS
   ========================================================= */

const Settings = ({ setActivePage }) => {
  const navigate = useNavigate();

  const { setUser, setIsLogin } = useAuth();

  const [themePreference, setThemePreference] = useState(() =>
    getStoredThemePreference()
  );

  const handleThemeChange = (value) => {
    setThemePreference(value);
    setStoredThemePreference(value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("AppUser");

    setUser(null);
    setIsLogin(false);

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const handleBack = () => {
    setActivePage("contacts");
  };

  return (
    <main className="flex h-full min-w-0 flex-1 flex-col bg-base-200">
      {/* =================================================
          HEADER
         ================================================= */}

      <header className="flex shrink-0 items-center gap-3 border-b border-base-300 bg-base-100 px-4 py-3.5 sm:px-6">
        <button
          type="button"
          onClick={handleBack}
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl text-base-content/60
            transition-all duration-200
            hover:bg-base-200 hover:text-base-content
            active:scale-95
          "
          title="Back to chats"
          aria-label="Back to chats"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display truncate text-lg font-bold">
              Settings
            </h1>

            <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary sm:inline-flex">
              Preferences
            </span>
          </div>

          <p className="truncate text-xs text-base-content/45">
            Customize your DostiHub experience
          </p>
        </div>
      </header>

      {/* =================================================
          CONTENT
         ================================================= */}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:py-8">
          {/* Page intro */}

          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Account settings
            </p>

            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Make DostiHub yours.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-base-content/50">
              Manage the way DostiHub looks and your current session from one
              simple place.
            </p>
          </div>

          {/* =================================================
              APPEARANCE
             ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            {/* Section heading */}

            <div className="border-b border-base-300 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MdPalette className="text-xl" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Appearance
                  </h3>

                  <p className="mt-0.5 text-[11px] text-base-content/45">
                    Control how DostiHub looks on this device.
                  </p>
                </div>
              </div>
            </div>

            {/* Theme setting */}

            <SettingRow
              icon={<MdPalette className="text-lg" />}
              title="Theme"
              description="Choose between light, dark, or your system preference."
            >
              <div className="w-full sm:w-52">
                <label className="relative block">
                  <select
                    aria-label="Choose theme"
                    value={themePreference}
                    onChange={(event) =>
                      handleThemeChange(event.target.value)
                    }
                    className="
                      h-11 w-full appearance-none
                      rounded-xl
                      border border-base-300
                      bg-base-200/50
                      pl-10 pr-10
                      text-sm font-medium
                      text-base-content
                      outline-none
                      transition-all
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/15
                    "
                  >
                    <option value="system">System</option>

                    {THEME_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/45">
                    {getThemeIcon(themePreference)}
                  </span>

                  <IoChevronForward
                    className="
                      pointer-events-none absolute right-3.5
                      top-1/2 -translate-y-1/2
                      rotate-90 text-sm text-base-content/40
                    "
                  />
                </label>
              </div>
            </SettingRow>
          </section>

          {/* =================================================
              SESSION
             ================================================= */}

          <section className="mt-5 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="border-b border-base-300 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-error/10 text-error">
                  <IoLogOutOutline className="text-xl" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Session
                  </h3>

                  <p className="mt-0.5 text-[11px] text-base-content/45">
                    Manage your current DostiHub session.
                  </p>
                </div>
              </div>
            </div>

            <SettingRow
              danger
              icon={<IoLogOutOutline className="text-lg" />}
              title="Log out"
              description="Sign out of your DostiHub account on this device."
            >
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex h-10 w-full items-center justify-center
                  gap-2 rounded-xl
                  border border-error/25
                  bg-error/5
                  px-5
                  text-xs font-bold text-error
                  transition-all duration-200
                  hover:border-error/40
                  hover:bg-error/10
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                <IoLogOutOutline className="text-base" />
                Log out
              </button>
            </SettingRow>
          </section>

          {/* =================================================
              ABOUT DOSTIHUB
             ================================================= */}

          <section className="relative mt-5 overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.04]">
            {/* Decorative glow */}

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20">
                  <TiMessages className="text-2xl" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold">
                      DostiHub
                    </h3>

                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-bold text-success">
                      Real-time chat
                    </span>
                  </div>

                  <p className="mt-2 max-w-xl text-xs leading-5 text-base-content/55">
                    Connect with your friends and family through simple,
                    fast and real-time conversations.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-[10px] font-semibold text-base-content/50">
                  Private conversations
                </span>

                <span className="rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-[10px] font-semibold text-base-content/50">
                  Real-time messaging
                </span>

                <span className="rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-[10px] font-semibold text-base-content/50">
                  Simple & focused
                </span>
              </div>
            </div>
          </section>

          {/* Footer spacing */}

          <div className="py-6 text-center">
            <p className="text-[10px] text-base-content/30">
              DostiHub · Your conversations, your way.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;

