"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={`glass rounded-full flex items-center justify-between px-5 py-3 transition-shadow duration-500 ${
            scrolled ? "shadow-card" : ""
          }`}
        >
          <a href="#top" data-cursor-hover className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span className="font-display italic text-xl leading-none">Buildora</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor-hover
                  className={`link-underline transition-colors ${
                    active === l.href ? "text-bronze" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="#contact" className="!px-5 !py-2.5 !text-xs">
              Book Consultation
            </MagneticButton>
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-5 md:hidden">
            <ul className="flex flex-col gap-4 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setOpen(false)} className="text-bronze">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
