# Buildora Developments — Landing Page

Next.js 15 / TypeScript / Tailwind CSS / GSAP / Lenis premium landing page.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build
npm run start
```

## Design system

- **Palette** — ink `#15171A`, stone `#F1EDE5`, fog `#7C7669`, bronze `#B0813F`, moss `#232B24`. Bronze is the one accent; used sparingly.
- **Type** — Instrument Serif (display, italic), Inter (body), Space Mono (labels, stats, blueprint annotations).
- **Signature motif** — the "drafting layer": a faint architectural grid, coordinate tick marks, and hand-drawn-style blueprint linework that recur across the hero, projects, and process sections. It ties the construction/architecture subject matter directly into the visual identity.

## About the imagery

No image-generation model was available while building this, so every
photography slot (`components/SceneArt.tsx`) is filled with a consistent
line-drawn architectural illustration instead of a photo — same palette,
same grid, same treatment everywhere, so the page still feels intentional
rather than full of broken images.

**To swap in real photography:** replace `<SceneArt variant="villa" ... />`
with a Next.js `<Image src="/villa.jpg" fill alt="..." />` wherever it
appears (`Hero.tsx`, `Projects.tsx`, `BeforeAfter.tsx`). The surrounding
layout, gradients, and captions don't need to change.

## Content to replace before launch

- Testimonials in `components/Testimonials.tsx` are placeholder quotes — swap for real client feedback.
- Contact details, address, and social links in `components/Footer.tsx`.
- Project names/locations in `components/Projects.tsx`.
- Newsletter form and mailto link currently have no backend — wire up to your ESP / API route.

## Notes

- Smooth scroll (Lenis) and most animations respect `prefers-reduced-motion`.
- Custom cursor auto-disables on touch/coarse-pointer devices.
- All components are client components only where interactivity requires it; the page shell stays a server component for performance.
