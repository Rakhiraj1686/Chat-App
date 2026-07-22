import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;

    setTheme(selectedTheme);
    localStorage.setItem("chatKroTheme", selectedTheme);

    if (selectedTheme) {
      document.documentElement.setAttribute(
        "data-theme",
        selectedTheme
      );
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("chatKroTheme") || "";

    setTheme(savedTheme);

    if (savedTheme) {
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          aria-label="DostiHub Home"
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-content shadow-sm transition duration-300 group-hover:scale-105">
            D
          </div>

          <div className="leading-none">
            <h1 className="text-xl font-black tracking-tight md:text-2xl">
              Dosti<span className="text-primary">Hub</span>
            </h1>

            <p className="mt-1 hidden text-[10px] font-medium text-base-content/50 sm:block">
              Connect. Chat. Belong.
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-2 md:flex">

          {/* Theme Selector */}
          <select
            id="theme-desktop"
            name="theme"
            value={theme}
            onChange={handleThemeChange}
            className="select select-bordered select-sm w-28 bg-base-100 text-xs"
            aria-label="Select theme"
          >
            <option value="">Theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>

          {/* Login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="btn btn-ghost btn-sm px-4"
          >
            Login
          </button>

          {/* Register */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn btn-primary btn-sm rounded-xl px-5"
          >
            Get Started
          </button>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          className="btn btn-ghost btn-square md:hidden"
          aria-label={
            isMobileMenuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={isMobileMenuOpen}
          onClick={() =>
            setIsMobileMenuOpen((prev) => !prev)
          }
        >
          {isMobileMenuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="border-t border-base-300 bg-base-100 px-4 pb-4 pt-3 md:hidden">
          <div className="mx-auto max-w-7xl space-y-3">

            {/* Theme */}
            <div>
              <label
                htmlFor="theme-mobile"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-base-content/50"
              >
                Appearance
              </label>

              <select
                id="theme-mobile"
                name="theme"
                value={theme}
                onChange={handleThemeChange}
                className="select select-bordered w-full"
              >
                <option value="">Default Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="claude">Claude</option>
                <option value="spotify">Spotify</option>
                <option value="vscode">VSCode</option>
                <option value="black">Black</option>
                <option value="corporate">Corporate</option>
                <option value="ghibli">Ghibli</option>
                <option value="gourmet">Gourmet</option>
                <option value="luxury">Luxury</option>
                <option value="mintlify">Mintlify</option>
                <option value="pastel">Pastel</option>
                <option value="perplexity">Perplexity</option>
                <option value="shadcn">Shadcn</option>
                <option value="slack">Slack</option>
                <option value="soft">Soft</option>
                <option value="valorant">Valorant</option>
              </select>
            </div>

            {/* Auth Actions */}
            <div className="grid grid-cols-2 gap-2 border-t border-base-300 pt-3">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/register");
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;