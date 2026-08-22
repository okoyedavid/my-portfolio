"use client";

import { projectItems } from "@/lib/site-data";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import PinnedProjectStory from "../PinnedProjectStory";
import Reveal from "./Reveal";

export default function SelectedWork() {
  const tourRef = useRef<HTMLDivElement>(null);
  const [tourVisible, setTourVisible] = useState(false);
  const lastProject = projectItems.at(-1);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTourVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(tour);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="selected-work"
      className="scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="selected-work-title"
    >
      <header className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <Reveal className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.14em] text-accent">
            Selected work
          </p>
          <h2 id="selected-work-title" className="h2 mt-3">
            Three products. Three different problems.
          </h2>
          <p className="mt-5 max-w-xl text-white/65">
            Follow each product from its public experience into the decisions
            and systems behind it.
          </p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <a
          href={lastProject ? `#project-${lastProject.num}` : "#contact"}
          className={
            tourVisible
              ? "fixed bottom-5 right-5 z-40 inline-flex animate-in items-center gap-2 rounded-full border border-white/15 bg-primary/90 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/70 shadow-lg backdrop-blur-sm duration-300 fade-in slide-in-from-bottom-2 hover:border-accent hover:text-accent md:bottom-7 md:right-8"
              : "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/70 hover:border-accent hover:text-accent"
          }
        >
          Skip to {lastProject?.title ?? "final project"}{" "}
          <FiArrowDown aria-hidden="true" />
        </a>
      </div>

      <div ref={tourRef}>
        {projectItems.map((project, index) => (
          <PinnedProjectStory
            key={project.title}
            project={project}
            projectIndex={index}
            projectCount={projectItems.length}
          />
        ))}
      </div>

    </section>
  );
}
