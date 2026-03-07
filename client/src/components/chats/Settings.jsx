import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

const Settings = ({ setActivePage }) => {
  const [theme, setTheme] = useState("");

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

  return (
    <div className="h-full flex flex-col bg-base-200">
      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 bg-base-100 shadow-md">
        <button
          onClick={() => setActivePage("contacts")}
          className="text-xl hover:text-primary"
        >
          <IoArrowBack />
        </button>

        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      <div className="w-40 m-4">
        <select
          name="theme"
          id="theme"
          className="select"
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
  );
};

export default Settings;
