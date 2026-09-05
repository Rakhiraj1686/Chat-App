import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const beats = [
  {
    title: "Written for real conversations",
    text: "Messages, not features, are the point. Everything else stays out of the way.",
  },
  {
    title: "Arrives the moment you send it",
    text: "Socket-backed delivery, so the person on the other end sees it now — not on refresh.",
  },
  {
    title: "One place for who matters",
    text: "Recent chats rise to the top. Everyone else is a search away.",
  },
];

const circles = ["Best friends", "Family group", "Old classmates", "Neighbours"];

const Home = () => {
  return (
    <main className="bg-base-200 text-base-content">
      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <div className="grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* LEFT: headline */}
          <div className="fade-up-soft">
            <p className="text-sm font-medium text-link">DostiHub</p>

            <h1 className="font-display mt-4 text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              दोस्ती deserves a
              <br />
              proper place to live.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-base-content/65">
              DostiHub is a simple, fast messaging app for the people you
              actually talk to — friends, family, the group chat that never
              sleeps. No noise, no ads, no algorithm deciding what you see.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="rounded-field bg-primary px-6 py-3.5 text-sm font-semibold text-primary-content shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Create your account
              </Link>

              <Link
                to="/login"
                className="text-sm font-semibold text-base-content/70 underline decoration-base-300 underline-offset-4 transition hover:text-base-content hover:decoration-base-content"
              >
                I already have one
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-base-300 pt-6 text-sm text-base-content/55">
              {circles.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>

          {/* RIGHT: a real conversation preview, not a decorative blob */}
          <div className="fade-up-soft" style={{ animationDelay: "120ms" }}>
            <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl shadow-base-content/[0.04]">
              <div className="flex items-center gap-3 border-b border-base-300 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-sm font-semibold text-neutral-content">
                  AS
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">Aarav Sharma</p>
                  <p className="text-xs text-success">Online</p>
                </div>
              </div>

              <div className="space-y-3 bg-base-200/60 px-5 py-6">
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl rounded-tl-md bg-base-100 px-4 py-2.5 text-sm shadow-sm">
                    landed. traffic from the airport is brutal though 😩
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-content">
                    take your time, we'll hold a table
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl rounded-tl-md bg-base-100 px-4 py-2.5 text-sm shadow-sm">
                    you're the best, see you in 20
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-1 pt-1 text-xs text-base-content/45">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  typing…
                </div>
              </div>

              <div className="border-t border-base-300 px-5 py-3.5">
                <div className="flex items-center gap-3 rounded-field border border-base-300 bg-base-200/60 px-4 py-2.5 text-sm text-base-content/40">
                  Message Aarav…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="border-y border-base-300 bg-base-100">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {beats.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-base-content/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="rounded-box bg-neutral px-8 py-12 text-neutral-content md:px-14 md:py-16">
          <h2 className="font-display max-w-lg text-3xl font-semibold leading-tight md:text-4xl">
            Your people are already waiting in the chat list.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-content/70">
            Takes a minute to set up. No credit card, no spam, just a place to talk.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-flex rounded-field bg-primary px-6 py-3.5 text-sm font-semibold text-primary-content transition-transform hover:-translate-y-0.5"
          >
            Start chatting free
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
