"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

export default function MagneticButton({
  children,
  className,
  variant = "solid",
  href,
  onClick,
  dataCursorHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  href?: string;
  onClick?: () => void;
  dataCursorHover?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const classes = clsx(
    "inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm tracking-wide transition-colors duration-300",
    variant === "solid"
      ? "bg-ink text-stone hover:bg-bronze"
      : "border border-ink/25 text-ink hover:border-bronze hover:text-bronze",
    className
  );

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="magnetic"
      data-cursor-hover={dataCursorHover}
    >
      {href ? (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </div>
  );
}
