import React from "react";
import { Link } from "react-router-dom";

const quickStats = [
  { value: "99.9%", label: "Message delivery uptime" },
  { value: "<120ms", label: "Average real-time latency" },
  { value: "24/7", label: "Cross-device sync" },
];

const featureCards = [
  {
    title: "Rooms That Move Fast",
    description:
      "Create focused channels for teams, projects, or communities and keep every conversation organized.",
  },
  {
    title: "Secure Account Flow",
    description:
      "Email login and Google auth are integrated so users can onboard quickly without compromising security.",
  },
  {
    title: "Zero-Noise Interface",
    description:
      "A clean layout and readable hierarchy keep your attention on messages instead of clutter.",
  },
];

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-linear-to-b from-cyan-50 via-sky-50 to-slate-100 text-slate-800">
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-cyan-300 bg-cyan-100/60 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-900">
              REAL-TIME CHAT, BUILT FOR FLOW
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              Talk faster.
              <br />
              Ship together.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              ChatKro keeps your team aligned with fast messaging, simple rooms,
              and a distraction-free interface made for daily collaboration.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Account
              </Link>
              <Link to="/login" className="btn btn-secondary btn-outline btn-lg">
                Sign In
              </Link>
              <Link to="/chatting" className="btn btn-accent btn-outline btn-lg">
                Open Chat
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-200 bg-white/90 shadow-2xl shadow-cyan-900/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-cyan-100 bg-sky-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="ml-2 text-xs text-slate-500">chatkro.live/rooms/product</p>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex w-fit max-w-[85%] items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[11px] font-bold text-sky-800">
                  PM
                </span>
                <p>Sprint review moved to 4:00 PM. Agenda is updated.</p>
              </div>

              <div className="ml-auto w-fit max-w-[85%] rounded-xl border border-cyan-200 bg-cyan-100 p-3 text-sm text-cyan-950">
                <p>Perfect. I will post release notes before the meeting.</p>
              </div>

              <div className="flex w-fit max-w-[85%] items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[11px] font-bold text-sky-800">
                  UX
                </span>
                <p>New onboarding screen is merged. Ready for QA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          {quickStats.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
            >
              <h3 className="text-3xl font-black text-slate-900">{item.value}</h3>
              <p className="mt-1 text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="mb-7">
          <p className="mb-2 inline-flex rounded-full border border-cyan-300 bg-cyan-100/60 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-900">
            WHY CHATKRO
          </p>
          <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
            Built for focused conversations
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-900/10"
            >
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;