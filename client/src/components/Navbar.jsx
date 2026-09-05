import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Laptop } from "lucide-react";
import {
  LIGHT_THEME,
  DARK_THEME,
  getStoredThemePreference,
  setStoredThemePreference,
} from "../config/theme";

const THEME_OPTIONS = [
  { value: LIGHT_THEME, label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Laptop },
  { value: DARK_THEME, label: "Dark", icon: Moon },
];

const ThemeToggle = ({ preference, onChange, className = "" }) => (
  <div
    role="radiogroup"
    aria-label="Theme"
    className={`inline-flex items-center gap-0.5 rounded-field border border-base-300 bg-base-100 p-0.5 ${className}`}
  >
    {THEME_OPTIONS.map((option) => {
      const active = preference === option.value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={active}
          aria-label={option.label}
          title={option.label}
          onClick={() => onChange(option.value)}
          className={`flex h-8 w-8 items-center justify-center rounded-[calc(var(--radius-field)-2px)] transition-colors ${
            active
              ? "bg-neutral text-neutral-content"
              : "text-base-content/50 hover:bg-base-200 hover:text-base-content"
          }`}
        >
          <option.icon size={15} strokeWidth={2.25} />
        </button>
      );
    })}
  </div>
);

const Navbar = () => {
  const [themePreference, setThemePreference] = useState(() => getStoredThemePreference());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleThemeChange = (value) => {
    setThemePreference(value);
    setStoredThemePreference(value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        {/* ================= LOGO ================= */}
        <Link to="/" aria-label="DostiHub home" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-field bg-neutral font-display text-lg font-semibold text-primary transition-transform duration-300 group-hover:-rotate-3">
            द
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-base-content">
            DostiHub
          </span>
        </Link>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle preference={themePreference} onChange={handleThemeChange} />

          <span className="mx-1 h-5 w-px bg-base-300" />

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-field px-3.5 py-2 text-sm font-medium text-base-content/70 transition-colors hover:text-base-content"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="rounded-field bg-primary px-4 py-2 text-sm font-semibold text-primary-content shadow-sm transition-transform hover:-translate-y-px active:translate-y-0"
          >
            Get started
          </button>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-field text-base-content md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="border-t border-base-300 bg-base-100 px-4 pb-5 pt-4 md:hidden">
          <div className="mx-auto max-w-6xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                Appearance
              </span>
              <ThemeToggle preference={themePreference} onChange={handleThemeChange} />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-base-300 pt-4">
              <button
                className="rounded-field border border-base-300 py-2.5 text-sm font-semibold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
              >
                Log in
              </button>

              <button
                className="rounded-field bg-primary py-2.5 text-sm font-semibold text-primary-content"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/register");
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
