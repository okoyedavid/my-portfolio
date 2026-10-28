# Current demo implementation

`/demo` keeps the existing mountain introduction, paused ring backdrop, 20%-from-top scroll trigger, reversible camera journey, statement, particle project names and screenshot galleries.

## Runtime files

- `components/ScrollParallaxScene.tsx` — existing mountain introduction.
- `components/RingsScrollJourney.tsx` — existing scroll and project stage choreography.
- `components/RingsTripViewport.jsx` — React state passed into the renderer.
- `components/demo/OriginalMotionViewport.jsx` — renderer mount/unmount and pause lifecycle, moved from the former nested Igloo project.
- `lib/demo-motion/` — unchanged animation controller, palette, particle text and its helper dependency, moved from the former nested project.
- `public/igloo-runtime/` — required renderer, geometry, textures and workers. Their URLs have been preserved.
- `components/demo/ProjectShowcase.tsx`, `WorkflowCarousel.tsx` and CSS modules — active project presentation and React screenshot carousel.
- `components/demo/project-data.ts` — independent snapshot of project data; homepage components continue to use their original data.

The experimental `/assets` route and its renderer/textures were removed. The nested `igloo-nextjs` app and static `workflow` reference folder were removed from this app after moving the files needed by `/demo`. The active React carousel remains in this directory. A recovery copy of removed reference folders is stored outside the project in the chat workspace.

Publication and attribution notes were retained at `docs/demo-animation/publication-notes.md`. Consolidating folders does not change the provenance of the current 3D runtime.
