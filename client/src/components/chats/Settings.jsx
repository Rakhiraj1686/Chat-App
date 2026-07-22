import React, { useEffect, useState } from "react";
import { IoArrowBack, IoColorPaletteOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Settings = ({ setActivePage }) => {
  const [theme, setTheme] = useState("");

  const themes = [
    { value: "", label: "Default" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "claude", label: "Claude" },
    { value: "spotify", label: "Spotify" },
    { value: "vscode", label: "VSCode" },
    { value: "black", label: "Black" },
    { value: "corporate", label: "Corporate" },
    { value: "ghibli", label: "Ghibli" },
    { value: "gourmet", label: "Gourmet" },
    { value: "luxury", label: "Luxury" },
    { value: "mintlify", label: "Mintlify" },
    { value: "pastel", label: "Pastel" },
    { value: "perplexity", label: "Perplexity" },
    { value: "shadcn", label: "Shadcn" },
    { value: "slack", label: "Slack" },
    { value: "soft", label: "Soft" },
    { value: "valorant", label: "Valorant" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("chatKroTheme") || "";

    setTheme(savedTheme);

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;

    setTheme(selectedTheme);
    localStorage.setItem("chatKroTheme", selectedTheme);

    if (selectedTheme) {
      document.documentElement.setAttribute("data-theme", selectedTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const selectedTheme =
    themes.find((item) => item.value === theme)?.label || "Default";

  return (
    <div className="flex h-full flex-col bg-base-200">
      {/* HEADER */}
      <div className="flex items-center gap-4 border-b border-base-300 bg-base-100 px-4 py-4 shadow-sm">
        <button
          onClick={() => setActivePage("contacts")}
          className="btn btn-circle btn-ghost btn-sm"
          title="Back"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-base-content">
            Settings
          </h2>

          <p className="text-xs text-base-content/60">
            Customize your DostiHUB experience
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* APPEARANCE */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IoColorPaletteOutline className="text-2xl" />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Appearance
                </h3>

                <p className="text-sm text-base-content/60">
                  Customize the look and feel of DostiHUB.
                </p>
              </div>
            </div>

            {/* CURRENT THEME */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-base-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
                  {theme === "dark" ? (
                    <MdDarkMode className="text-xl" />
                  ) : (
                    <MdLightMode className="text-xl" />
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Current Theme
                  </p>

                  <p className="font-semibold">
                    {selectedTheme}
                  </p>
                </div>
              </div>

              <span className="badge badge-primary">
                Active
              </span>
            </div>
          </section>

          {/* THEME SELECTOR */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <h3 className="text-lg font-bold">
              Choose Theme
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              Select your preferred theme.
            </p>

            <select
              value={theme}
              onChange={handleThemeChange}
              className="select select-bordered mt-4 w-full"
            >
              {themes.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </section>

          {/* APP INFO */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-bold text-primary">
              DostiHUB
            </h3>

            <p className="mt-2 text-sm leading-6 text-base-content/70">
              Connect with your friends and contacts through real-time
              conversations.
            </p>

            <p className="mt-3 text-xs text-base-content/50">
              Your conversations. Your connections. Your space.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;