"use client";

import { useRef, useState } from "react";
import SceneArt from "./SceneArt";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section className="relative py-28 bg-ink text-stone overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs tracking-widest2 uppercase text-bronze mb-4">
          Refurbishment
        </p>
        <h2 className="font-display italic text-4xl md:text-5xl mb-10 max-w-xl">
          The same address, transformed.
        </h2>

        <div
          ref={wrapRef}
          className="relative aspect-[16/9] rounded-xl2 overflow-hidden border border-stone/15 select-none cursor-ew-resize"
          onMouseDown={() => (dragging.current = true)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
          onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
          data-cursor-hover
        >
          <div className="absolute inset-0">
            <SceneArt variant="after" tone="dusk" className="w-full h-full" />
            <span className="absolute top-4 right-4 font-mono text-[10px] tracking-widest2 uppercase glass-dark rounded-full px-3 py-1.5">
              After
            </span>
          </div>

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <SceneArt variant="before" tone="warm" className="w-full h-full" />
            <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest2 uppercase glass rounded-full px-3 py-1.5 text-ink">
              Before
            </span>
          </div>

          <div
            className="absolute top-0 bottom-0 w-px bg-stone/80"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-stone flex items-center justify-center shadow-soft">
              <div className="flex gap-1">
                <span className="w-1 h-3 bg-ink/50 rounded-full" />
                <span className="w-1 h-3 bg-ink/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-stone/50 font-mono">
          Drag the handle to compare
        </p>
      </div>
    </section>
  );
}
