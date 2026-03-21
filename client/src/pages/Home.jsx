import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const liveStats = [
  { value: "1.2M+", label: "Messages exchanged" },
  { value: "58K", label: "Daily active chats" },
  { value: "99.9%", label: "Delivery uptime" },
  { value: "120ms", label: "Average latency" },
];

const valueCards = [
  {
    title: "Fast Rooms",
    description:
      "Make separate spaces for family, friends, and projects so every chat stays clear and focused.",
  },
  {
    title: "Simple Login",
    description:
      "Use email or Google sign-in and jump into conversations in seconds, no setup headache.",
  },
  {
    title: "Clean UI",
    description:
      "A distraction-free interface keeps your eyes on people, not on cluttered controls.",
  },
];

const moments = [
  {
    title: "Family Circle",
    text: "Share daily updates and keep everyone connected in one warm, private room.",
    tone: "from-primary/10 to-primary/5 border-primary/30",
  },
  {
    title: "Friends Hangout",
    text: "Plan trips, send memes, and keep the group vibe alive with instant replies.",
    tone: "from-secondary/10 to-secondary/5 border-secondary/30",
  },
  {
    title: "Team Sprint",
    text: "Turn ideas into execution using channel-based discussions and real-time updates.",
    tone: "from-accent/15 to-accent/5 border-accent/30",
  },
];

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-linear-to-b from-base-200 via-base-100 to-base-200 text-base-content">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-12 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20">
          <div className="fade-up-soft">
            <p className="inline-flex rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-xs font-semibold tracking-widest text-base-content/70">
              DOSTIHUB REAL-TIME EXPERIENCE
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight text-base-content sm:text-5xl md:text-6xl" style={{ fontFamily: "Sora, Poppins, sans-serif" }}>
              Chat that feels
              <span className="block text-primary">alive and personal.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-base-content/75 md:text-lg">
              DostiHub is built for real people and real conversations, from
              family groups to fast-moving teams. Instant updates, easy rooms,
              and zero chaos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn btn-primary btn-lg">
                Start Free
              </Link>
              <Link to="/chatting" className="btn btn-accent btn-outline btn-lg">
                Explore Live Chat
              </Link>
              <Link to="/login" className="btn btn-secondary btn-outline btn-lg">
                Sign In
              </Link>
            </div>
          </div>

          <div className="fade-up-soft relative" style={{ animationDelay: "120ms" }}>
            <div className="rounded-3xl border border-primary/30 bg-base-100/90 p-4 shadow-2xl shadow-base-content/10 backdrop-blur md:p-5">
              <div className="mb-4 rounded-2xl border border-base-300 bg-base-200/70 p-4">
                <p className="text-xs font-semibold tracking-wide text-base-content/60">LIVE ROOM</p>
                <h3 className="mt-1 text-xl font-black text-base-content">Weekend Plan Squad</h3>
                <div className="mt-3 space-y-2 text-sm text-base-content/80">
                  <p className="w-fit rounded-xl border border-primary/25 bg-primary/10 px-3 py-2">Priya: Sunday trekking fixed?</p>
                  <p className="ml-auto w-fit rounded-xl border border-secondary/25 bg-secondary/10 px-3 py-2">Aman: Yes, 6:30 AM pickup.</p>
                  <p className="w-fit rounded-xl border border-accent/25 bg-accent/10 px-3 py-2">Rohit: Snacks list bhi share kar do.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {liveStats.map((item) => (
                  <article key={item.label} className="rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm">
                    <p className="text-2xl font-black text-base-content">{item.value}</p>
                    <p className="text-xs text-base-content/65">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-8 md:pb-20">
        <div className="mb-7 flex items-end justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
              MADE FOR EVERY TYPE OF CHAT
            </p>
            <h2 className="text-2xl font-black text-base-content md:text-4xl" style={{ fontFamily: "Sora, Poppins, sans-serif" }}>
              One app, many vibes
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {moments.map((item, index) => (
            <article
              key={item.title}
              className={`stagger-soft rounded-3xl border bg-linear-to-br p-6 shadow-md ${item.tone}`}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <h3 className="text-xl font-black text-base-content">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-base-content/75">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {valueCards.map((item, index) => (
            <article
              key={item.title}
              className="stagger-soft rounded-2xl border border-base-300 bg-base-100/90 p-5 shadow-sm"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <p className="text-xs font-semibold tracking-wider text-info">FEATURE 0{index + 1}</p>
              <h3 className="mt-2 text-xl font-black text-base-content">{item.title}</h3>
              <p className="mt-2 text-base-content/70">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="fade-up-soft rounded-3xl border border-primary/35 bg-primary p-7 text-primary-content shadow-2xl md:p-10">
          <p className="text-xs font-semibold tracking-widest text-primary-content/75">READY TO CONNECT</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl" style={{ fontFamily: "Sora, Poppins, sans-serif" }}>
            Bring your people together in one place.
          </h2>
          <p className="mt-3 max-w-2xl text-primary-content/80">
            Start your first room in less than 2 minutes and feel the difference
            of instant, meaningful conversation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-accent btn-lg">
              Create Your Room
            </Link>
            <Link to="/about" className="btn btn-ghost btn-outline btn-lg text-primary-content">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;