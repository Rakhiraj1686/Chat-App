import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import { IoArrowBack, IoClose, IoSearchOutline, IoLinkOutline } from "react-icons/io5";
import { HiOutlinePhotograph, HiOutlineDocumentText } from "react-icons/hi";

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

const formatMemberSince = (iso) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const SectionLabel = ({ children }) => (
  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/40">
    {children}
  </p>
);

/**
 * Full profile experience for whoever you're currently chatting with.
 * Renders identically for the desktop side-panel and the mobile full-screen
 * takeover — the parent decides the wrapper/positioning, this component is
 * just the content.
 *
 * All data shown is either:
 *  - fetched fresh from GET /api/user/profile/:userId (safe fields only,
 *    no password/tokens — see server/src/controllers/userController.js), or
 *  - derived from messages already loaded in this conversation (shared links).
 * Nothing here is invented client-side.
 */
const ChatProfilePanel = ({ contact, isOnline, sharedLinks, onClose, onSearchInConversation, isMobile }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contact?._id) return;

    let cancelled = false;

    const loadProfile = async () => {
      try {
        const res = await api.get(`/user/profile/${contact._id}`);
        if (!cancelled) setProfile(res.data.data);
      } catch (error) {
        if (!cancelled) {
          toast.error(error?.response?.data?.message || "Couldn't load this profile");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setLoading(true);
    setProfile(null);
    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [contact?._id]);

  const memberSince = formatMemberSince(profile?.createdAt);

  return (
    <div className="flex h-full flex-col bg-base-100">
      {/* HEADER */}
      <div className="flex shrink-0 items-center gap-3 border-b border-base-300 px-4 py-4">
        {isMobile ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/70 hover:bg-base-200"
            aria-label="Back to chat"
          >
            <IoArrowBack className="text-xl" />
          </button>
        ) : null}

        <h2 className="font-display flex-1 text-lg font-semibold">Profile</h2>

        {!isMobile ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-field text-base-content/70 hover:bg-base-200"
            aria-label="Close profile"
          >
            <IoClose className="text-xl" />
          </button>
        ) : null}
      </div>

      {/* CONTENT */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* IDENTITY */}
        <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral text-2xl font-semibold text-neutral-content">
              {getInitials(contact?.fullName)}
            </div>
            {isOnline && (
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-base-100 bg-success" />
            )}
          </div>

          <h3 className="font-display mt-4 text-xl font-semibold">{contact?.fullName}</h3>

          <p className={`mt-1 text-sm ${isOnline ? "text-success" : "text-base-content/45"}`}>
            {isOnline ? "● Online" : "○ Offline"}
          </p>
        </div>

        <div className="space-y-6 px-6 pb-8">
          {/* ABOUT */}
          <section>
            <SectionLabel>About</SectionLabel>
            {loading ? (
              <div className="h-4 w-3/4 animate-pulse rounded bg-base-300" />
            ) : (
              <p className={`text-sm leading-6 ${profile?.about ? "text-base-content" : "italic text-base-content/45"}`}>
                {profile?.about || "No bio available"}
              </p>
            )}
          </section>

          {/* CONTACT INFO */}
          <section className="space-y-3 border-t border-base-300 pt-5">
            <SectionLabel>Contact information</SectionLabel>

            <div>
              <p className="text-xs text-base-content/45">Email</p>
              <p className="text-sm">
                {loading ? "…" : profile?.email || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/45">Mobile</p>
              <p className="text-sm">
                {loading ? "…" : profile?.mobileNumber || "Not provided"}
              </p>
            </div>

            {memberSince && (
              <div>
                <p className="text-xs text-base-content/45">Member since</p>
                <p className="text-sm">{memberSince}</p>
              </div>
            )}
          </section>

          {/* SHARED LINKS — derived from real message text, never invented */}
          <section className="border-t border-base-300 pt-5">
            <SectionLabel>Shared links</SectionLabel>
            {sharedLinks.length === 0 ? (
              <p className="text-sm text-base-content/45">No links shared yet.</p>
            ) : (
              <ul className="space-y-2">
                {sharedLinks.slice(0, 6).map((link) => (
                  <li key={link}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 truncate text-sm text-link hover:underline"
                      title={link}
                    >
                      <IoLinkOutline className="shrink-0 text-base" />
                      <span className="truncate">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {sharedLinks.length > 6 && (
              <p className="mt-2 text-xs text-base-content/45">
                +{sharedLinks.length - 6} more
              </p>
            )}
          </section>

          {/* SHARED MEDIA / FILES — honest placeholder, no upload backend yet */}
          <section className="border-t border-base-300 pt-5">
            <SectionLabel>Shared media &amp; files</SectionLabel>
            <div className="flex items-center gap-3 rounded-field border border-dashed border-base-300 px-4 py-4 text-base-content/45">
              <HiOutlinePhotograph className="text-xl" />
              <HiOutlineDocumentText className="text-xl" />
              <p className="text-xs leading-5">
                Photo and file sharing isn't available in this app yet.
              </p>
            </div>
          </section>

          {/* ACTIONS */}
          <section className="border-t border-base-300 pt-5">
            <button
              type="button"
              onClick={onSearchInConversation}
              className="flex h-11 w-full items-center gap-3 rounded-field px-3 text-sm font-medium text-base-content/80 transition hover:bg-base-200"
            >
              <IoSearchOutline className="text-lg" />
              Search in conversation
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChatProfilePanel;
