import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 bg-base-100/95 flex justify-center text-center">
      <footer className="border-t border-base-300 bg-base-100">
  <div className="mx-auto max-w-6xl px-4 py-6">

    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

      <p className="text-sm text-base-content/70">
        © {year} <span className="font-semibold">DostiHub</span>. Made with ❤️ in India.
      </p>

      <div className="flex gap-6 text-sm">
        <a className="text-base-content/70 hover:text-primary transition">Privacy Policy</a>
        <a className="text-base-content/70 hover:text-primary transition">Terms</a>
        <a className="text-base-content/70 hover:text-primary transition">Contact</a>
      </div>

    </div>

  </div>
</footer>
    </footer>
  );
};

export default Footer;
