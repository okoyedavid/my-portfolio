# David Okoye — Software Engineer

I build dependable software systems across the interface and backend. My work focuses on the places where product design meets engineering discipline: authentication, permissions, APIs, background processing, failure handling, and responsive user experiences.

This repository contains my portfolio at [okoyedavid.com](https://okoyedavid.com). It is designed as a single-page engineering narrative: how I think, what I have built, and the experience behind the work.

## Engineering mindset

I think in systems. I care about how software is structured, where it can fail, and what makes it reliable under real-world use.

React, Next.js, Node.js, and TypeScript are the tools I currently use most, but frameworks are not the destination. My goal is to build software that remains secure, understandable, and resilient as its users and requirements grow.

## What I currently build

- Full-stack SaaS products
- Authentication and session systems
- Multi-tenant permissions and RBAC
- REST APIs and backend services
- Background jobs, retries, and failure handling
- Responsive product interfaces

## Selected engineering work

### Aurex

A multi-tenant business operations platform with secure sessions, system and custom roles, explicit permission grants and denials, employee workflows, audit trails, and durable MongoDB-backed background processing.

[Live product](https://aurex.okoyedavid.com)

### Aurescore

A full-stack assessment platform built around clear public flows, role-aware dashboards, and separate TypeScript frontend and backend applications.

[Live product](https://aurescore.okoyedavid.com) · [Frontend source](https://github.com/okoyedavid/aurescore) · [Backend source](https://github.com/okoyedavid/aurescore-backend)

### Aurela

A product experience exploring polished responsive interfaces and a clear journey from public discovery into the application itself.

## Portfolio implementation

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Framer Motion with reduced-motion support
- Responsive image and video delivery
- Semantic, accessible single-page structure
- Static metadata, sitemap, robots, and structured person data

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Contact

I am open to frontend, full-stack TypeScript, and graduate software-engineering opportunities.

- [Email](mailto:okoyedav7@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/okoyedavid7)
- [GitHub](https://github.com/okoyedavid)

## Mountain and rings scroll demo

Open `/demo`: “Hi there,” → “My name is David Okoye” → “Let’s take you for a trip” → three ice portals.

- `components/ScrollParallaxScene.tsx` retains the mountain parallax and cloud-mask name reveal. The wireframe opening is no longer mounted.
- `components/PageTopSpacer.tsx` removes the unused header reservation on this immersive route.
- `components/RingsScrollJourney.tsx` pins the invitation and maps scroll progress to the camera passage. Scroll backwards to reverse it.
- `components/RingsTripViewport.jsx` and `components/demo/OriginalMotionViewport.jsx` mount the preserved renderer directly, without inspector controls or an iframe.
- `lib/demo-motion/` owns the animation controller, amber palette and custom project-particle integration.
- `public/igloo-runtime/assets/` retains the required original renderer, geometry, textures, fonts and decoder dependencies.
- The former nested Igloo project, the `/assets` experiment and the static workflow reference were removed after consolidation. Publication and attribution notes are retained in `docs/demo-animation/publication-notes.md`.

The ring canvas loads as its section approaches and uses the saved original engine's shaders, camera curves, smoke, distortion and bloom. GPU rendering pauses while the viewport is offscreen. Reduced-motion mode shows a static camera pose and a shorter scroll section. The invitation, skip link, keyboard navigation and return-to-portfolio link remain usable.
