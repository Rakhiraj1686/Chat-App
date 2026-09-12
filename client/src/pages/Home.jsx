import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Footer from "../components/Footer";

const conversations = [
  {
    initials: "NS",
    name: "Nisha & Sam",
    message: "Dinner at 8?",
    time: "2m",
    color: "bg-primary",
  },
  {
    initials: "RK",
    name: "Rohan Kapoor",
    message: "See you tomorrow",
    time: "1h",
    color: "bg-info",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Simple conversations",
    text: "Everything stays focused on the people and messages that matter.",
  },
  {
    icon: Zap,
    title: "Real-time messaging",
    text: "Send and receive messages instantly with socket-powered communication.",
  },
  {
    icon: Users,
    title: "Stay connected",
    text: "Keep friends, family and your favorite conversations close together.",
  },
];

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-base-100 text-base-content">
      {/* ================= HERO ================= */}
      <section className="relative">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -right-40 top-32 h-96 w-96 rounded-full bg-secondary/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            {/* ================= HERO CONTENT ================= */}
            <div className="fade-up-soft">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles size={13} />
                Built for real connections
              </div>

              <h1 className="font-display mt-6 max-w-xl text-[3.2rem] font-bold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]">
                Conversations
                <span className="block text-primary">that feel close.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-base-content/60 sm:text-[17px]">
                DostiHub is a simple, fast and friendly place to talk with
                your friends, family and the people who matter most.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
                >
                  Start chatting
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/login"
                  className="btn btn-ghost rounded-xl px-6 font-semibold"
                >
                  Sign in
                </Link>
              </div>

              {/* Small trust row */}
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-xs text-base-content/50">
                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-success" />
                  Real-time
                </span>

                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-success" />
                  Fast
                </span>

                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-success" />
                  Simple
                </span>
              </div>
            </div>

            {/* ================= CHAT PREVIEW ================= */}
            <div
              className="fade-up-soft relative"
              style={{ animationDelay: "100ms" }}
            >
              {/* Top floating status */}
              <div className="absolute -right-2 -top-6 z-20 hidden items-center gap-2.5 rounded-2xl border border-base-300 bg-base-100 px-3.5 py-2.5 shadow-xl sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-success/10 text-success">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <p className="text-[10px] font-bold">Your conversations</p>
                  <p className="text-[9px] text-base-content/45">
                    Private & personal
                  </p>
                </div>
              </div>

              {/* Main application window */}
              <div className="overflow-hidden rounded-[1.6rem] border border-base-300 bg-base-100 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
                {/* Browser/app bar */}
                <div className="flex items-center justify-between border-b border-base-300 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-content shadow-sm">
                      <MessageCircle size={15} />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold">DostiHub</p>
                      <p className="text-[8px] text-base-content/40">
                        Messages
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-error/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-warning/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-success/60" />
                  </div>
                </div>

                <div className="grid grid-cols-[185px_1fr] sm:grid-cols-[215px_1fr]">
                  {/* ================= CHAT SIDEBAR ================= */}
                  <aside className="hidden border-r border-base-300 bg-base-200/40 p-3 sm:block">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">Chats</p>
                        <p className="mt-0.5 text-[9px] text-base-content/40">
                          Recent conversations
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label="New chat"
                        className="btn btn-primary btn-circle btn-xs"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <label className="input input-xs mb-3 flex h-8 items-center gap-1.5 rounded-lg border-base-300 bg-base-100">
                      <Search
                        size={11}
                        className="shrink-0 text-base-content/35"
                      />
                      <input
                        aria-label="Search chats"
                        placeholder="Search"
                        className="min-w-0 text-[10px]"
                      />
                    </label>

                    <div className="space-y-1">
                      {conversations.map((conversation, index) => (
                        <div
                          key={conversation.name}
                          className={`flex items-center gap-2 rounded-xl p-2 transition-colors ${
                            index === 0
                              ? "bg-primary/10"
                              : "hover:bg-base-300/50"
                          }`}
                        >
                          <div
                            className={`avatar placeholder ${conversation.color} shrink-0 text-[8px] text-white`}
                          >
                            <div className="w-8 rounded-full">
                              <span>{conversation.initials}</span>
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <p className="truncate text-[10px] font-bold">
                                {conversation.name}
                              </p>

                              <span className="shrink-0 text-[7px] text-base-content/30">
                                {conversation.time}
                              </span>
                            </div>

                            <p className="mt-0.5 truncate text-[8px] text-base-content/45">
                              {conversation.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </aside>

                  {/* ================= ACTIVE CHAT ================= */}
                  <div className="min-w-0">
                    {/* Chat header */}
                    <div className="flex items-center gap-2.5 border-b border-base-300 px-4 py-3">
                      <div className="avatar placeholder bg-primary text-[10px] text-primary-content">
                        <div className="w-8 rounded-full">
                          <span>NS</span>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-bold">
                          Nisha & Sam
                        </p>

                        <p className="mt-0.5 flex items-center gap-1 text-[8px] font-medium text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success" />
                          2 people online
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label="More chat options"
                        className="btn btn-ghost btn-circle btn-xs"
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="min-h-[310px] space-y-3 bg-base-200/30 px-4 py-5 sm:min-h-[340px] sm:px-5">
                      <div className="mx-auto w-fit rounded-full border border-base-300 bg-base-100 px-3 py-1 text-[7px] font-bold tracking-[0.15em] text-base-content/35">
                        TODAY
                      </div>

                      <div className="flex justify-start">
                        <div className="max-w-[76%] rounded-2xl rounded-tl-md bg-base-100 px-3.5 py-2.5 text-[10px] leading-5 shadow-sm">
                          Hey! Did you reach safely? 👋
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="max-w-[76%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[10px] leading-5 text-primary-content shadow-sm">
                          Yep! Just landed. Traffic is crazy 😩
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="max-w-[76%] rounded-2xl rounded-tl-md bg-base-100 px-3.5 py-2.5 text-[10px] leading-5 shadow-sm">
                          Take your time. We are waiting for you.
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="max-w-[76%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[10px] leading-5 text-primary-content shadow-sm">
                          You’re the best ❤️
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-1 pt-1 text-[8px] text-base-content/35">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                        Sam is typing...
                      </div>
                    </div>

                    {/* Input */}
                    <div className="border-t border-base-300 bg-base-100 p-3">
                      <div className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-200/40 px-3 py-2">
                        <MessageCircle
                          size={13}
                          className="text-base-content/30"
                        />

                        <span className="flex-1 text-[9px] text-base-content/30">
                          Write a message...
                        </span>

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-content">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom floating people */}
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-base-300 bg-base-100 px-3.5 py-2.5 shadow-xl sm:flex">
                <div className="flex -space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-primary-content ring-2 ring-base-100">
                    NS
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[7px] font-bold text-secondary-content ring-2 ring-base-100">
                    RK
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-[7px] font-bold text-info-content ring-2 ring-base-100">
                    +
                  </div>
                </div>

                <span className="text-[9px] font-semibold">
                  Always connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-y border-base-300 bg-base-200/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Why DostiHub
              </p>

              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Made to keep you close.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-base-content/50">
              No clutter. No complicated menus. Just a better place for
              everyday conversations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-base-content/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-content">
                      <Icon size={19} />
                    </div>

                    <span className="text-xs font-bold text-base-content/20">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-base-content/55">
                    {feature.text}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-success">
                    <Check size={13} />
                    Built into every conversation
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-neutral px-6 py-12 text-neutral-content sm:px-10 md:px-16 md:py-16">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-content/10 bg-neutral-content/5 px-3 py-1.5 text-[10px] font-semibold">
              <MessageCircle size={12} />
              Start chatting
            </div>

            <h2 className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Your people are
              <span className="text-primary"> one message away.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-content/55 sm:text-base">
              Create your account and bring your conversations into one simple
              place.
            </p>

            <Link
              to="/register"
              className="btn btn-primary mt-7 rounded-xl px-6 shadow-lg shadow-primary/20"
            >
              Create free account
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;