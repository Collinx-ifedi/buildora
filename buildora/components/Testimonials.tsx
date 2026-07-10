"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TESTIMONIALS = [
  {
    quote:
      "Buildora managed our entire estate from architectural drawing to final handover. The consistency across teams is rare in this market.",
    name: "A. Okonkwo",
    role: "Private Client, Lekki",
  },
  {
    quote:
      "We refurbished a legacy commercial building with them and the finish exceeded what we'd specified. Communication never lapsed.",
    name: "T. Adeyemi",
    role: "Director, Northgate Holdings",
  },
  {
    quote:
      "Facility management has been quietly excellent for three years running. Issues get resolved before we even notice them.",
    name: "S. Bello",
    role: "Estate Chair, Marlowe Residences",
  },
  {
    quote:
      "The sales process felt more like working with a boutique advisor than a developer. Every detail was considered.",
    name: "R. Nwosu",
    role: "Homeowner, The Aldura Residence",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 32,
      ease: "none",
      repeat: -1,
    });

    track.addEventListener("mouseenter", () => tween.pause());
    track.addEventListener("mouseleave", () => tween.resume());

    return () => {
      tween.kill();
    };
  }, []);

  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative py-28 bg-stone overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-12">
        <p className="font-mono text-xs tracking-widest2 uppercase text-bronze mb-4">
          Clients
        </p>
        <h2 className="font-display italic text-4xl md:text-5xl max-w-xl">
          Trusted with the properties that matter most.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone to-transparent z-10" />

        <div ref={trackRef} className="flex gap-6 w-max px-6">
          {loop.map((t, i) => (
            <div
              key={i}
              data-cursor-hover
              className="glass rounded-xl2 p-8 w-[380px] shrink-0 shadow-card"
              style={{ transform: `translateY(${i % 2 === 0 ? "0px" : "14px"})` }}
            >
              <p className="font-display italic text-xl leading-snug text-ink/85">
                “{t.quote}”
              </p>
              <div className="mt-6 pt-5 border-t border-ink/10">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-ink/50 font-mono">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
