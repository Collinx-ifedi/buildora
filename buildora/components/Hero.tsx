"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";
import SceneArt from "./SceneArt";

const HEADLINE = "Building Spaces That Define Tomorrow.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(wordsRef.current, { yPercent: 120 })
        .set(".hero-fade", { opacity: 0, y: 24 })
        .set(".hero-shape", { opacity: 0, scale: 0.85 })
        .to(wordsRef.current, {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.06,
          delay: 0.2,
        })
        .to(
          ".hero-fade",
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.6"
        )
        .to(
          ".hero-shape",
          { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15 },
          "-=0.9"
        );

      // slow ambient float for architectural shapes
      gsap.to(".hero-shape", {
        y: "-=18",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.6, from: "random" },
      });

      // animated blueprint line draw
      gsap.fromTo(
        ".blueprint-line",
        { strokeDashoffset: 400 },
        {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.inOut",
          stagger: 0.3,
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      gsap.to(glow, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.8,
        ease: "power3.out",
      });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-stone blueprint-grid bg-noise flex flex-col justify-center pt-32 pb-16"
    >
      {/* mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(176,129,63,0.35) 0%, rgba(176,129,63,0) 70%)",
        }}
      />

      {/* floating architectural shapes */}
      <div className="hero-shape absolute top-28 right-[8%] w-40 h-40 border border-ink/15 rounded-full hidden md:block" />
      <div className="hero-shape absolute bottom-24 left-[6%] w-24 h-24 border border-bronze/40 rotate-45 hidden md:block" />
      <div className="hero-shape absolute top-1/2 right-[18%] w-16 h-16 bg-bronze/10 rounded-xl2 hidden lg:block" />

      {/* animated blueprint lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="blueprint-line"
          d="M0 620 L420 620 L420 500 L900 500"
          fill="none"
          stroke="#B0813F"
          strokeWidth="1"
          strokeDasharray="400"
          opacity="0.4"
        />
        <path
          className="blueprint-line"
          d="M1200 180 L780 180 L780 300 L300 300"
          fill="none"
          stroke="#15171A"
          strokeWidth="1"
          strokeDasharray="400"
          opacity="0.2"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
        <div>
          <p className="hero-fade font-mono text-xs tracking-widest2 uppercase text-fog mb-6">
            Buildora Developments — Est. Property &amp; Construction Group
          </p>

          <h1 className="font-display text-[13vw] leading-[0.98] sm:text-[9vw] lg:text-7xl xl:text-8xl tracking-[-0.01em] max-w-4xl">
            {HEADLINE.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="inline-block italic"
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-8 max-w-md text-lg text-ink/70 font-light">
            We design, build, sell, maintain, and transform exceptional
            properties.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">Explore Projects</MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Book Consultation
            </MagneticButton>
          </div>
        </div>

        <div className="hero-fade relative rounded-xl2 overflow-hidden border border-ink/10 shadow-soft aspect-[4/5] hidden lg:block">
          <SceneArt variant="villa" className="w-full h-full" />
          <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 font-mono text-[11px] tracking-wide text-ink/70">
            FIG. 01 — RESIDENTIAL / GOLDEN HOUR
          </div>
        </div>
      </div>

      <div className="hero-fade relative mx-auto max-w-6xl px-6 w-full mt-14 flex items-center gap-3 text-fog font-mono text-[11px] tracking-widest2 uppercase">
        <span className="w-8 h-px bg-fog/50" />
        Scroll to explore
      </div>
    </section>
  );
}
