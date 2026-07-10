"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01",
    title: "Property Development",
    copy: "End-to-end development, from land acquisition and feasibility to fully realised communities.",
  },
  {
    n: "02",
    title: "Construction",
    copy: "Luxury residential and commercial builds delivered to exacting architectural standards.",
  },
  {
    n: "03",
    title: "Sales",
    copy: "Bringing exceptional properties to discerning buyers, backed by a trusted brand.",
  },
  {
    n: "04",
    title: "Maintenance",
    copy: "Ongoing property care that protects the long-term value of every asset we deliver.",
  },
  {
    n: "05",
    title: "Refurbishment",
    copy: "Thoughtful renovation that transforms ageing properties into modern, premium spaces.",
  },
  {
    n: "06",
    title: "Facility Management",
    copy: "Full operational oversight for residential estates and commercial developments.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 bg-stone">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-bronze mb-4">
              What we do
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl max-w-lg">
              One partner, every stage of the property lifecycle.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60">
            From the first survey to decades of upkeep — Buildora carries a
            property the whole way through.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              data-cursor-hover
              className="service-card group relative rounded-xl2 bg-white/60 border border-ink/8 p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft hover:border-bronze/40 overflow-hidden"
            >
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-bronze/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-fog">{s.n}</span>
              <h3 className="font-display italic text-2xl mt-4 mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed">{s.copy}</p>
              <div className="mt-6 h-px w-8 bg-ink/15 group-hover:w-14 group-hover:bg-bronze transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
