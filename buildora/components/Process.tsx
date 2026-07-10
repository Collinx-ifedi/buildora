"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneArt from "./SceneArt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    label: "Design",
    copy: "Architects and planners translate the brief into drawings, models, and a build strategy — every dimension considered before ground is broken.",
  },
  {
    label: "Build",
    copy: "Our construction teams execute to the drawing, with quality checks at every phase of the residential or commercial build.",
  },
  {
    label: "Deliver",
    copy: "Completed properties are handed over — or brought to market — with the finish and documentation a premium buyer expects.",
  },
  {
    label: "Maintain",
    copy: "Facility management and maintenance keep the property performing and appreciating long after the ribbon is cut.",
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-item", {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-28 bg-stone">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
        <div>
          <p className="font-mono text-xs tracking-widest2 uppercase text-bronze mb-4">
            Why Buildora
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl mb-8">
            A single, accountable process.
          </h2>
          <p className="text-ink/60 max-w-md">
            Most developers hand a property off between three or four
            companies. We don&apos;t. One team carries every property from
            first sketch to ongoing upkeep — which is why our clients stay
            with us for decades, not one transaction.
          </p>
          <div className="mt-10 rounded-xl2 overflow-hidden border border-ink/10 aspect-[4/3] hidden sm:block">
            <SceneArt variant="blueprint" className="w-full h-full" />
          </div>
        </div>

        <div className="tick-rule text-ink/40 pl-8">
          {STAGES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              data-cursor-hover
              className="process-item w-full text-left group py-6 border-b border-ink/10 last:border-none"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className={`font-mono text-xs transition-colors ${
                    active === i ? "text-bronze" : "text-fog"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-display italic text-3xl md:text-4xl transition-colors duration-300 ${
                    active === i ? "text-ink" : "text-ink/35"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              <div
                className={`grid transition-all duration-500 ease-out ${
                  active === i ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                }`}
                style={{ display: "grid" }}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-ink/60 max-w-lg pl-[2.15rem]">{s.copy}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
