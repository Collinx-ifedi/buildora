"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative bg-stone pt-20 pb-8 border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] gap-12 pb-14">
          <div>
            <span className="font-display italic text-2xl">Buildora</span>
            <p className="mt-4 text-sm text-ink/60 max-w-xs">
              Property development, construction, sales, and facility
              management — one accountable partner, start to finish.
            </p>
            <div className="flex gap-4 mt-6 text-xs font-mono tracking-wide uppercase">
              {["Instagram", "LinkedIn", "X"].map((s) => (
                <a key={s} href="#" data-cursor-hover className="link-underline text-ink/60 hover:text-bronze">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-fog mb-4">
              Navigate
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["Services", "#services"],
                ["Projects", "#projects"],
                ["Process", "#process"],
                ["Clients", "#testimonials"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="link-underline text-ink/70 hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-fog mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-ink/70">
              <li>hello@buildora.dev</li>
              <li>+234 1 234 5678</li>
              <li className="pt-2 text-ink/50">
                12 Admiralty Way
                <br />
                Lekki Phase 1, Lagos
              </li>
            </ul>
            <p className="font-mono text-xs tracking-widest2 uppercase text-fog mt-5 mb-2">
              Hours
            </p>
            <p className="text-sm text-ink/70">Mon – Fri, 9:00 – 18:00 WAT</p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-fog mb-4">
              Stay Informed
            </p>
            <p className="text-sm text-ink/60 mb-4">
              Occasional notes on new developments and available properties.
            </p>
            {submitted ? (
              <p className="text-sm text-bronze">You&apos;re on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-transparent border-b border-ink/25 py-2 text-sm outline-none focus:border-bronze transition-colors"
                />
                <button
                  type="submit"
                  data-cursor-hover
                  className="text-xs font-mono uppercase tracking-wide text-bronze link-underline"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-ink/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-ink/40 font-mono">
          <span>© {new Date().getFullYear()} Buildora Developments. All rights reserved.</span>
          <span>Building spaces that define tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}
