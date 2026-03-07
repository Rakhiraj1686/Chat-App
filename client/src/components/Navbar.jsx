import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("chatKroTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("chatKroTheme");
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Dashboard", path: "/userDashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-primary text-primary-content shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div>
          <h1 className="text-2xl font-black leading-none sm:text-3xl">
            Dosti<span className="text-accent">HUB</span>
          </h1>
          <p className="mt-0.5 text-xs text-primary-content/70 sm:text-sm">
            Connect with friends instantly
          </p>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex lg:text-base">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="transition hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          <button className="btn btn-secondary btn-sm lg:btn-md" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-secondary btn-sm lg:btn-md" onClick={() => navigate("/register")}>
            Register
          </button>
          <select
            name="theme"
            id="theme-desktop"
            className="select select-bordered select-sm w-28 bg-base-100 text-base-content lg:w-32"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Default</option>
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

        <button
          type="button"
          className="btn btn-ghost btn-circle text-primary-content md:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 stroke-current">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-primary-content/20 bg-primary px-4 pb-4 pt-3 text-primary-content md:hidden">
          <div className="mx-auto w-full max-w-7xl rounded-xl border border-base-300 bg-base-100 p-3 text-base-content shadow-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Menu</p>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="rounded-lg px-3 py-2 hover:bg-base-200">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="my-3 h-px bg-base-300" />

            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>

            <label className="mt-3 block text-xs font-medium text-base-content/70" htmlFor="theme-mobile">
              Theme
            </label>
            <select
              name="theme"
              id="theme-mobile"
              className="select select-bordered select-sm mt-1 w-full"
              onChange={handleThemeChange}
              value={theme}
            >
              <option value="">Default</option>
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
