import React from "react";

const contactMethods = [
  {
    title: "Support",
    value: "support@dostihub.app",
    note: "For account, login, and technical help.",
  },
  {
    title: "Partnerships",
    value: "partners@dostihub.app",
    note: "For collaborations, integrations, and growth.",
  },
  {
    title: "Careers",
    value: "careers@dostihub.app",
    note: "For job openings and contributor roles.",
  },
];

const faqs = [
  {
    q: "How quickly do you reply?",
    a: "Most messages receive a response within one business day.",
  },
  {
    q: "Can I request a feature?",
    a: "Yes, we review product suggestions weekly and prioritize by impact.",
  },
  {
    q: "Is there enterprise support?",
    a: "Yes, dedicated onboarding and SLA plans are available.",
  },
];

const Contact = () => {
  return (
    <main className="relative overflow-hidden bg-base-200 text-base-content">
      <div className="pointer-events-none absolute -left-10 top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-12 md:px-8 md:pt-16">
        <p className="badge badge-primary badge-outline px-3 py-3 text-xs font-bold tracking-[0.12em]">
          CONTACT DOSTIHUB
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Let us build better conversations together.
        </h1>
        <p className="mt-4 max-w-2xl text-base-content/80 md:text-lg">
          Reach out for support, product questions, or partnerships. We are
          always open to feedback that helps DostiHub become more useful.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 md:grid-cols-12 md:px-8">
        <article className="card bg-base-100 border border-base-300 shadow-xl md:col-span-7">
          <div className="card-body p-6">
          <h2 className="text-2xl font-black md:text-3xl">Send a Message</h2>
          <p className="mt-2 text-base-content/70">
            Share your query and we will get back with practical next steps.
          </p>

          <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <label className="sm:col-span-1">
              <span className="mb-1 block text-sm font-semibold">Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full"
              />
            </label>

            <label className="sm:col-span-1">
              <span className="mb-1 block text-sm font-semibold">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold">Subject</span>
              <input
                type="text"
                placeholder="What would you like to discuss?"
                className="input input-bordered w-full"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold">Message</span>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
              />
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Send Message
              </button>
              <p className="text-sm text-base-content/70">We usually respond within 24 hours.</p>
            </div>
          </form>
          </div>
        </article>

        <article className="card bg-base-100 border border-base-300 shadow-lg md:col-span-5">
          <div className="card-body p-6">
          <h2 className="text-2xl font-black">Contact Channels</h2>
          <div className="mt-4 space-y-3">
            {contactMethods.map((item) => (
              <div key={item.title} className="rounded-2xl border border-base-300 bg-base-200/50 p-4">
                <p className="text-sm font-extrabold tracking-[0.08em] text-primary">
                  {item.title}
                </p>
                <p className="mt-1 font-bold">{item.value}</p>
                <p className="mt-1 text-sm text-base-content/70">{item.note}</p>
              </div>
            ))}
          </div>
          </div>
        </article>
      </section>

      <section className="mx-auto my-12 w-full max-w-6xl px-4 md:px-8">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
          <h2 className="text-2xl font-black md:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-2xl border border-base-300 bg-base-200/50 p-4">
                <h3 className="font-extrabold">{item.q}</h3>
                <p className="mt-2 text-sm text-base-content/75">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;