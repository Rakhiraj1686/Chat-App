import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const principles = [
  {
    title: "Conversations First",
    text: "Every screen is designed to reduce noise and keep attention on people, not UI clutter.",
  },
  {
    title: "Fast By Default",
    text: "From message delivery to route transitions, we optimize for speed and clear feedback.",
  },
  {
    title: "Secure And Human",
    text: "Authentication and account protection are built in, without making onboarding feel heavy.",
  },
];

const milestones = [
  { time: "Phase 1", label: "Authentication + account onboarding" },
  { time: "Phase 2", label: "Real-time chat architecture and UI" },
  { time: "Phase 3", label: "Profile tools and community features" },
];

const highlights = [
  { label: "Active conversations", value: "12K+" },
  { label: "Avg. message latency", value: "<120ms" },
  { label: "Uptime commitment", value: "99.9%" },
];

const buildingBlocks = ["Realtime rooms", "Google + email auth", "Persistent profiles", "Secure APIs"];

const About = () => {
  return (
    <main className="relative overflow-hidden bg-base-200 text-base-content">
      <div className="pointer-events-none absolute -left-12 top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <section className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 pb-8 pt-10 md:grid-cols-12 md:px-8 md:pt-14">
        <div className="md:col-span-7">
          <p className="badge badge-primary badge-outline px-3 py-3 text-xs font-bold tracking-[0.12em]">
            ABOUT DOSTIHUB
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Conversations that feel clean,
            <span className="text-primary"> human, and fast.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base-content/80 md:text-lg">
            DostiHub is designed for people who want quick messaging without
            the chaos. We blend clarity, speed, and comfort so every chat feels
            easy to follow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/chatting" className="btn btn-primary">
              Open Chat
            </Link>
            <Link to="/register" className="btn btn-outline btn-secondary">
              Create Account
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.label}
                className="card border border-base-300 bg-base-100 shadow-lg"
              >
                <div className="card-body p-4">
                  <p className="text-3xl font-black">{item.value}</p>
                  <p className="mt-1 text-sm text-base-content/70">{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <article className="card border border-base-300 bg-base-100 shadow-2xl">
            <div className="card-body p-0">
              <div className="flex items-center gap-2 border-b border-base-300 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-error" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <p className="ml-2 text-xs text-base-content/60">dostihub.live/product-room</p>
              </div>

              <div className="space-y-3 p-4">
                <div className="w-fit max-w-[90%] rounded-2xl bg-primary/10 p-3 text-sm">
                  Real-time chat should feel effortless, not overwhelming.
                </div>
                <div className="ml-auto w-fit max-w-[90%] rounded-2xl bg-secondary/15 p-3 text-sm">
                  Exactly. We designed DostiHub for clear focus and speed.
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl bg-accent/15 p-3 text-sm">
                  Build with your team, or hang out with your people.
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 md:grid-cols-12 md:px-8" aria-label="Product highlights">
        <article className="card border border-base-300 bg-base-100 shadow-xl md:col-span-8">
          <div className="card-body p-6">
            <h2 className="text-2xl font-black md:text-3xl">Why We Built It</h2>
            <p className="mt-3 text-base-content/70">
              Most chat apps are either overloaded with options or too basic for
              teams. DostiHub is built for balance: practical workflows,
              expressive social energy, and dependable performance.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {buildingBlocks.map((item) => (
                <span key={item} className="badge badge-outline badge-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="card border border-base-300 bg-base-100 shadow-lg md:col-span-4">
          <div className="card-body p-6">
            <h3 className="text-xl font-extrabold">Design Promise</h3>
            <ul className="mt-3 space-y-2 text-sm text-base-content/75">
              <li>Clear message hierarchy for long conversations</li>
              <li>Theme support for day and night usage</li>
              <li>Simple onboarding with secure auth flow</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-8" aria-label="Core principles">
        <h2 className="text-2xl font-black md:text-4xl">Our Core Principles</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.title}
              className="card border border-base-300 bg-base-100 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="card-body p-5">
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 text-base-content/70">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-8" aria-label="Project timeline">
        <h2 className="text-2xl font-black md:text-4xl">Product Journey</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {milestones.map((step) => (
            <article
              key={step.time}
              className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <span className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-primary to-accent" />
              <p className="pl-3 text-xs font-extrabold tracking-[0.12em] text-primary">
                {step.time}
              </p>
              <p className="mt-2 pl-3 text-base-content/80">{step.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto my-12 w-full max-w-6xl px-4 md:px-8">
        <div className="rounded-3xl border border-primary/30 bg-linear-to-r from-primary/15 via-base-100 to-accent/15 p-7 text-center shadow-lg">
          <h2 className="text-3xl font-black">Join the conversation.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base-content/75">
            Whether you are building with your team or hanging out with friends,
            DostiHub gives your chats a clearer home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;