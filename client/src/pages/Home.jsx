import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const highlights = [
  {
    title: "Private conversations",
    text: "A simple space for conversations that matter.",
  },
  {
    title: "Real-time messaging",
    text: "Stay connected with fast and responsive chats.",
  },
  {
    title: "Simple by design",
    text: "Everything you need, without unnecessary complexity.",
  },
];

const moments = [
  {
    title: "Friends",
    text: "Plan your next hangout, share moments, and keep the conversation going.",
    tone: "from-primary/10 to-primary/5 border-primary/30",
  },
  {
    title: "Family",
    text: "Stay connected with the people closest to you in one simple space.",
    tone: "from-secondary/10 to-secondary/5 border-secondary/30",
  },
  {
    title: "Communities",
    text: "Bring people together around conversations, ideas, and shared interests.",
    tone: "from-accent/15 to-accent/5 border-accent/30",
  },
];

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] overflow-hidden bg-linear-to-b from-base-200 via-base-100 to-base-200 text-base-content">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20">
          {/* LEFT CONTENT */}
          <div className="fade-up-soft">
            <p className="inline-flex rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-xs font-semibold tracking-widest text-base-content/70">
              A SIMPLE PLACE TO CONNECT
            </p>

            <h1
              className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: "Sora, Poppins, sans-serif" }}
            >
              Conversations that feel
              <span className="block text-primary">
                natural and personal.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-base-content/70 md:text-lg">
              DostiHub is a simple and modern chat platform for the people who
              matter to you. Stay connected, share conversations, and enjoy a
              cleaner way to communicate.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn btn-primary btn-lg">
                Start Chatting
              </Link>

              <Link to="/chatting" className="btn btn-outline btn-lg">
                Explore DostiHub
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-base-content/65">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                Real-time messaging
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Secure authentication
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Personal profiles
              </span>
            </div>
          </div>

          {/* ================= CHAT PREVIEW ================= */}
          <div
            className="fade-up-soft relative"
            style={{ animationDelay: "120ms" }}
          >
            <div className="absolute inset-10 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-base-100 shadow-2xl shadow-base-content/10">
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-base-300 px-4 py-4">
                <div className="avatar placeholder">
                  <div className="w-11 rounded-full bg-primary text-primary-content">
                    <span>A</span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-bold">Aarav Sharma</p>
                  <p className="text-xs text-success">● Online</p>
                </div>

                <button className="btn btn-ghost btn-sm">
                  •••
                </button>
              </div>

              {/* Messages */}
              <div className="min-h-[360px] space-y-3 bg-base-200/70 p-4">
                <div className="flex justify-center">
                  <span className="rounded-full bg-base-100 px-3 py-1 text-xs text-base-content/50 shadow-sm">
                    Today
                  </span>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-base-300 bg-base-100 px-4 py-3 text-sm shadow-sm">
                    Hey! How are you? 👋
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-content shadow-sm">
                    I'm good! What about you?
                    <span className="ml-2 text-xs opacity-70">✓✓</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-base-300 bg-base-100 px-4 py-3 text-sm shadow-sm">
                    Doing great. Just exploring DostiHub ✨
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-content shadow-sm">
                    Welcome to DostiHub 😊
                    <span className="ml-2 text-xs opacity-70">✓✓</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2 pt-2 text-xs text-base-content/50">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  Aarav is typing...
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2 border-t border-base-300 bg-base-100 p-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-bordered w-full rounded-full"
                  disabled
                />

                <button className="btn btn-primary btn-circle">
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT BENEFITS ================= */}
      <section className="border-y border-base-300 bg-base-100/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3 md:px-8">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <p className="text-xs font-bold tracking-widest text-primary">
                0{index + 1}
              </p>

              <h3 className="mt-2 text-lg font-black">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= WHY DOSTIHUB ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
              WHY DOSTIHUB
            </p>

            <h2
              className="mt-4 text-3xl font-black leading-tight md:text-5xl"
              style={{ fontFamily: "Sora, Poppins, sans-serif" }}
            >
              Less noise.
              <span className="block text-primary">
                More connection.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-base-content/70">
              Communication should not feel complicated. DostiHub focuses on
              what matters most — giving people a simple and comfortable place
              to connect.
            </p>

            <p className="mt-4 max-w-xl leading-8 text-base-content/70">
              Whether you are chatting with a friend, staying close to family,
              or building a community, your conversations deserve a place that
              feels easy to use.
            </p>

            <Link
              to="/about"
              className="btn btn-primary btn-outline mt-6"
            >
              Learn More About DostiHub
            </Link>
          </div>

          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl">
            <p className="text-sm font-semibold text-base-content/50">
              THE DOSTIHUB EXPERIENCE
            </p>

            <h3 className="mt-2 text-2xl font-black">
              Made for the way people actually talk.
            </h3>

            <div className="mt-6 space-y-3">
              {[
                "Simple conversations",
                "Fast real-time updates",
                "Personal user profiles",
                "Secure account access",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-200 px-4 py-3 text-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-content">
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="mb-7">
          <p className="mb-2 inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
            MADE FOR REAL CONNECTIONS
          </p>

          <h2
            className="text-3xl font-black md:text-4xl"
            style={{ fontFamily: "Sora, Poppins, sans-serif" }}
          >
            One app, many conversations.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {moments.map((item, index) => (
            <article
              key={item.title}
              className={`stagger-soft rounded-3xl border bg-linear-to-br p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.tone}`}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <h3 className="text-xl font-black">
                {item.title}
              </h3>

              <p className="mt-3 leading-relaxed text-base-content/70">
                {item.text}
              </p>

              <Link
                to="/register"
                className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Start connecting →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="fade-up-soft rounded-3xl border border-primary/35 bg-primary p-7 text-primary-content shadow-2xl md:p-10">
          <p className="text-xs font-semibold tracking-widest text-primary-content/75">
            READY TO CONNECT?
          </p>

          <h2
            className="mt-2 text-3xl font-black leading-tight md:text-5xl"
            style={{ fontFamily: "Sora, Poppins, sans-serif" }}
          >
            Your conversations start here.
          </h2>

          <p className="mt-3 max-w-2xl text-primary-content/80">
            Create your account and find a simpler way to stay connected with
            the people who matter to you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-accent btn-lg">
              Create Account
            </Link>

            <Link
              to="/chatting"
              className="btn btn-ghost btn-outline btn-lg text-primary-content"
            >
              Start Chatting
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;