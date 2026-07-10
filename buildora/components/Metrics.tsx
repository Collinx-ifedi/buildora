"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Homes Managed" },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        const target = METRICS[i].value;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.floor(counter.val).toString();
          },
        });
      });

      gsap.from(".metric-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-ink text-stone blueprint-grid-dark">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="metric-card border border-stone/10 rounded-xl2 p-6 md:p-8 hover:border-bronze/50 transition-colors duration-500"
            >
              <div className="font-display text-4xl md:text-5xl tabular text-bronze">
                <span
                  ref={(el) => {
                    if (el) numberRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {m.suffix}
              </div>
              <p className="mt-3 text-xs md:text-sm text-stone/60 font-mono tracking-wide uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
