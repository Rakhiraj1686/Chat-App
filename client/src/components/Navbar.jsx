import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Palette } from "lucide-react";
import {
  THEME_OPTIONS,
  getStoredThemePreference,
  setStoredThemePreference,
} from "../config/theme";

const ThemeToggle = ({ preference, onChange, className = "" }) => (
  <label
    className={`select select-xs w-[105px] min-w-0 flex items-center gap-1.5 border-base-300 bg-base-100 px-2 ${className}`}
  >
    <Palette
      size={14}
      className="shrink-0 text-base-content/60"
    />

    <select
      aria-label="Theme"
      value={preference}
      onChange={(event) => onChange(event.target.value)}
      className="w-full min-w-0 bg-transparent text-xs outline-none"
    >
      <option value="system">System</option>

      {THEME_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const Navbar = () => {
  const [themePreference, setThemePreference] = useState(() =>
    getStoredThemePreference(),
  );
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
        <Link
          to="/"
          aria-label="DostiHub home"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-field bg-neutral font-display text-lg font-semibold text-primary transition-transform duration-300 group-hover:-rotate-3">
            द
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-base-content">
            DostiHub
          </span>
        </Link>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            preference={themePreference}
            onChange={handleThemeChange}
          />

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
              <ThemeToggle
                preference={themePreference}
                onChange={handleThemeChange}
              />
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
