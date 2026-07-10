"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-ink text-stone blueprint-grid-dark overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(176,129,63,0.35) 0%, rgba(176,129,63,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="cta-reveal font-mono text-xs tracking-widest2 uppercase text-bronze mb-6">
          Start a Project
        </p>
        <h2 className="cta-reveal font-display italic text-5xl md:text-7xl leading-tight">
          Let&apos;s Build Something Exceptional.
        </h2>
        <p className="cta-reveal mt-6 text-stone/60 max-w-lg mx-auto">
          Tell us about your property — development, construction, sale,
          refurbishment, or ongoing management — and a Buildora advisor will
          respond within one business day.
        </p>
        <div className="cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="mailto:hello@buildora.dev"
            className="!bg-bronze !text-ink hover:!bg-stone"
          >
            Book Consultation
          </MagneticButton>
          <MagneticButton href="#projects" variant="outline" className="!border-stone/25 !text-stone hover:!text-bronze hover:!border-bronze">
            View Our Work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
