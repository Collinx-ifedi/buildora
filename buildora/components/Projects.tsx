"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneArt from "./SceneArt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Residential", "Commercial", "Refurbishment"] as const;

const PROJECTS = [
  { title: "The Aldura Residence", cat: "Residential", loc: "Lekki, Lagos", art: "villa", tall: true },
  { title: "Northgate Business Park", cat: "Commercial", loc: "Abuja", art: "hq", tall: false },
  { title: "Marlowe Estate", cat: "Residential", loc: "Victoria Island", art: "aerial", tall: false },
  { title: "The Refinery Lofts", cat: "Refurbishment", loc: "Ikoyi, Lagos", art: "after", tall: true },
  { title: "Sable Court Residences", cat: "Residential", loc: "Banana Island", art: "interior", tall: false },
  { title: "Crestview Tower", cat: "Commercial", loc: "Port Harcourt", art: "construction", tall: false },
];

export default function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const visible = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }
    );
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 bg-ink text-stone">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-bronze mb-4">
              Featured Work
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl">
              A portfolio built to last.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-cursor-hover
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide uppercase transition-colors duration-300 border ${
                  filter === c
                    ? "bg-bronze text-ink border-bronze"
                    : "border-stone/20 text-stone/60 hover:border-bronze/60 hover:text-stone"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 [grid-auto-flow:dense]"
        >
          {visible.map((p) => (
            <div
              key={p.title}
              data-cursor-hover
              className={`project-card group relative rounded-xl2 overflow-hidden border border-stone/10 ${
                p.tall ? "row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${p.tall ? "aspect-[4/6]" : "aspect-[4/3]"}`}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <SceneArt variant={p.art as any} tone="dusk" className="w-full h-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-bronze mb-1">
                    {p.cat}
                  </p>
                  <h3 className="font-display italic text-2xl">{p.title}</h3>
                  <p className="text-xs text-stone/60 mt-1">{p.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
