import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack, IoColorPaletteOutline, IoLogOutOutline } from "react-icons/io5";
import { Sun, Moon, Laptop } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  LIGHT_THEME,
  DARK_THEME,
  getStoredThemePreference,
  setStoredThemePreference,
} from "../../config/theme";

const THEME_OPTIONS = [
  { value: LIGHT_THEME, label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Laptop },
  { value: DARK_THEME, label: "Dark", icon: Moon },
];

const Settings = ({ setActivePage }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const [themePreference, setThemePreference] = useState(() => getStoredThemePreference());

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

  return (
    <div className="flex h-full flex-col bg-base-200">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-4 py-4">
        <button
          onClick={() => setActivePage("contacts")}
          className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/70 hover:bg-base-200"
          title="Back"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <div>
          <h2 className="font-display text-xl font-semibold text-base-content">Settings</h2>
          <p className="text-xs text-base-content/55">Your DostiHub preferences</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {/* APPEARANCE */}
          <section className="rounded-box border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-field bg-primary/10 text-primary">
                <IoColorPaletteOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Appearance</h3>
                <p className="text-sm text-base-content/55">Choose how DostiHub looks on this device.</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map((option) => {
                const active = themePreference === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleThemeChange(option.value)}
                    className={`flex flex-col items-center gap-2 rounded-field border py-4 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-link"
                        : "border-base-300 text-base-content/65 hover:bg-base-200"
                    }`}
                  >
                    <option.icon size={18} />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* SESSION */}
          <section className="rounded-box border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-field bg-error/10 text-error">
                <IoLogOutOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Session</h3>
                <p className="text-sm text-base-content/55">Sign out of DostiHub on this device.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-field border border-error/30 text-sm font-semibold text-error transition hover:bg-error/10"
            >
              <IoLogOutOutline className="text-lg" />
              Log out
            </button>
          </section>

          {/* APP INFO */}
          <section className="rounded-box border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-display font-semibold text-link">DostiHub</h3>
            <p className="mt-2 text-sm leading-6 text-base-content/70">
              Connect with your friends and family through real-time conversations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
