
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api";
import {
  IoArrowBack,
  IoClose,
  IoSearchOutline,
  IoLinkOutline,
  IoMailOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoInformationCircleOutline,
  IoChevronForward,
} from "react-icons/io5";
import {
  HiOutlinePhotograph,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";

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

const SectionTitle = ({ children }) => (
  <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/35">
    {children}
  </p>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-base-200/70">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon className="text-base" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-medium uppercase tracking-wide text-base-content/35">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-base-content">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const ChatProfilePanel = ({
  contact,
  isOnline,
  sharedLinks = [],
  onClose,
  onSearchInConversation,
  isMobile = false,
}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contact?._id) return;

    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      setProfile(null);

      try {
        const res = await api.get(`/user/profile/${contact._id}`);

        if (!cancelled) {
          setProfile(res.data.data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message ||
              "Couldn't load this profile"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [contact?._id]);

  const memberSince = formatMemberSince(profile?.createdAt);

  if (!contact) return null;

  return (
    <div className="flex h-full min-h-0 flex-col bg-base-100">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="flex shrink-0 items-center gap-3 border-b border-base-300 px-4 py-3.5">

        {isMobile ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base-content/60 transition hover:bg-base-200 hover:text-base-content"
            aria-label="Back to chat"
          >
            <IoArrowBack className="text-xl" />
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          <h2 className="font-display truncate text-base font-bold">
            Contact info
          </h2>

          <p className="mt-0.5 text-[10px] text-base-content/40">
            {isOnline ? "Currently online" : "Contact details"}
          </p>
        </div>

        {!isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base-content/60 transition hover:bg-base-200 hover:text-base-content"
            aria-label="Close profile"
          >
            <IoClose className="text-xl" />
          </button>
        )}
      </header>

      {/* =========================================================
          SCROLLABLE CONTENT
      ========================================================= */}
      <div className="min-h-0 flex-1 overflow-y-auto">

        {/* =======================================================
            PROFILE HERO
        ======================================================= */}
        <section className="relative overflow-hidden border-b border-base-300 px-5 pb-7 pt-8 text-center">

          {/* subtle background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto w-fit">

            <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] bg-neutral text-2xl font-bold text-neutral-content shadow-lg">
              {getInitials(contact.fullName)}
            </div>

            {isOnline && (
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-base-100 bg-success">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            )}
          </div>

          <h3 className="font-display mt-5 text-xl font-bold">
            {contact.fullName}
          </h3>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-success" : "bg-base-content/20"
              }`}
            />

            <span
              className={`text-xs font-medium ${
                isOnline
                  ? "text-success"
                  : "text-base-content/40"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Quick action */}
          <button
            type="button"
            onClick={onSearchInConversation}
            className="mx-auto mt-5 flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 py-2 text-xs font-semibold text-base-content/70 shadow-sm transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <FaRegCommentDots />
            Open conversation
          </button>
        </section>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <div className="space-y-7 px-4 py-6">

          {/* =====================================================
              ABOUT
          ===================================================== */}
          <section>
            <SectionTitle>About</SectionTitle>

            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">

              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-base-300" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-base-300" />
                  <div className="h-3 w-2/5 animate-pulse rounded bg-base-300" />
                </div>
              ) : (
                <div className="flex gap-3">
                  <IoInformationCircleOutline className="mt-0.5 shrink-0 text-lg text-primary" />

                  <p
                    className={`text-sm leading-6 ${
                      profile?.about
                        ? "text-base-content/75"
                        : "italic text-base-content/40"
                    }`}
                  >
                    {profile?.about || "No bio available"}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              CONTACT INFORMATION
          ===================================================== */}
          <section>
            <SectionTitle>Contact information</SectionTitle>

            <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">

              <InfoRow
                icon={IoMailOutline}
                label="Email"
                value={
                  loading
                    ? "Loading..."
                    : profile?.email
                }
              />

              <div className="mx-3 border-t border-base-300" />

              <InfoRow
                icon={IoCallOutline}
                label="Mobile"
                value={
                  loading
                    ? "Loading..."
                    : profile?.mobileNumber
                }
              />

              {memberSince && (
                <>
                  <div className="mx-3 border-t border-base-300" />

                  <InfoRow
                    icon={IoCalendarOutline}
                    label="Member since"
                    value={memberSince}
                  />
                </>
              )}
            </div>
          </section>

          {/* =====================================================
              SHARED LINKS
          ===================================================== */}
          <section>
            <div className="flex items-center justify-between">
              <SectionTitle>Shared links</SectionTitle>

              {sharedLinks.length > 0 && (
                <span className="mb-3 rounded-full bg-primary/10 px-2 py-1 text-[9px] font-bold text-primary">
                  {sharedLinks.length}
                </span>
              )}
            </div>

            {sharedLinks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/30 px-4 py-7 text-center">

                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-base-200 text-base-content/30">
                  <IoLinkOutline className="text-xl" />
                </div>

                <p className="mt-3 text-xs font-medium text-base-content/50">
                  No shared links
                </p>

                <p className="mt-1 text-[10px] leading-5 text-base-content/35">
                  Links shared in this conversation will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sharedLinks.slice(0, 6).map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link}
                    className="group flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3 transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IoLinkOutline className="text-base" />
                    </div>

                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-base-content/70 group-hover:text-primary">
                      {link}
                    </span>

                    <IoChevronForward className="shrink-0 text-sm text-base-content/25 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                ))}

                {sharedLinks.length > 6 && (
                  <p className="pt-1 text-center text-[10px] font-medium text-base-content/40">
                    +{sharedLinks.length - 6} more links
                  </p>
                )}
              </div>
            )}
          </section>

          {/* =====================================================
              MEDIA & FILES
          ===================================================== */}
          <section>
            <SectionTitle>Media & files</SectionTitle>

            <div className="rounded-2xl border border-base-300 bg-base-200/30 p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-200 text-base-content/35">
                  <HiOutlinePhotograph className="text-lg" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">
                    Media sharing
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-base-content/40">
                    Photos, videos and documents shared in this chat will appear here once media sharing is enabled.
                  </p>
                </div>

                <HiOutlineDocumentText className="mt-1 shrink-0 text-lg text-base-content/20" />
              </div>
            </div>
          </section>

          {/* =====================================================
              SEARCH
          ===================================================== */}
          <section className="border-t border-base-300 pt-5">

            <button
              type="button"
              onClick={onSearchInConversation}
              className="group flex w-full items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-3.5 text-left transition hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-base-200 text-base-content/50 transition group-hover:bg-primary/10 group-hover:text-primary">
                <IoSearchOutline className="text-lg" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Search conversation
                </p>

                <p className="mt-0.5 text-[10px] text-base-content/40">
                  Find messages from this chat
                </p>
              </div>

              <IoChevronForward className="text-base text-base-content/25 transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </button>
          </section>

          {/* bottom spacing */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ChatProfilePanel;
