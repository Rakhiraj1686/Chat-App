import React from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const year = new Date().getFullYear();

  const handlePlaceholderLink = (label) => () => {
    toast(`${label} page is coming soon.`);
  };

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-base-content/70">
            © {year} <span className="font-display font-semibold">DostiHub</span>. Made with ❤️ in India.
          </p>

          <div className="flex gap-6 text-sm">
            <button
              type="button"
              onClick={handlePlaceholderLink("Privacy Policy")}
              className="text-base-content/70 transition hover:text-primary"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={handlePlaceholderLink("Terms")}
              className="text-base-content/70 transition hover:text-primary"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={handlePlaceholderLink("Contact")}
              className="text-base-content/70 transition hover:text-primary"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
