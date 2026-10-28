"use client";

import type { DemoProjectStoryItem } from "./project-data";
import styles from "./DemoPinnedProjectStory.module.css";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { FiArrowRight, FiArrowUpRight, FiPlay } from "react-icons/fi";

type PinnedProject = {
  num: string;
  title: string;
  category: string;
  summary: string;
  contribution: string;
  features: readonly string[];
  architecture: string;
  note?: string | null;
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
  story: readonly DemoProjectStoryItem[];
};

function firstSentence(value: string) {
  const match = value.match(/^.*?[.!?](?:\s|$)/);
  return match?.[0].trim() ?? value;
}

function displayUrl(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function PinnedVideo({
  item,
}: {
  item: Extract<DemoProjectStoryItem, { type: "video" }>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    await videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="relative aspect-video w-[90vw] shrink-0 self-center overflow-hidden bg-black xl:h-full xl:w-auto">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        aria-label={item.title}
        controls={playing}
        poster={item.poster}
        preload="metadata"
        playsInline
        onEnded={() => setPlaying(false)}
      >
        <source src={item.source} />
      </video>
      {!playing && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 transition-colors hover:bg-black/35"
          aria-label={`Play ${item.title}`}
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-white/70 text-2xl">
            <FiPlay aria-hidden="true" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.14em]">
            Play project film
          </span>
        </button>
      )}
    </div>
  );
}

export default function DemoPinnedProjectStory({
  project,
  projectIndex,
  projectCount,
}: {
  project: PinnedProject;
  projectIndex: number;
  projectCount: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [pinDistance, setPinDistance] = useState(0);
  const orderedStory = useMemo(
    () => [
      ...project.story.filter((item) => item.type !== "video"),
      ...project.story.filter((item) => item.type === "video"),
    ],
    [project.story],
  );
  const liveLink = project.links[0];

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!section || !viewport || !rail) return;

    let frame = 0;
    const desktop = window.matchMedia("(min-width: 1280px)");

    const measure = () => {
      if (!desktop.matches) {
        setPinDistance(0);
        rail.style.transform = "";
        return;
      }
      setPinDistance(Math.max(0, rail.scrollWidth - viewport.clientWidth));
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!desktop.matches) return;
        const start = section.offsetTop;
        const available = Math.max(
          1,
          section.offsetHeight - window.innerHeight,
        );
        const progress = Math.min(
          1,
          Math.max(0, (window.scrollY - start) / available),
        );
        rail.style.transform = `translate3d(${-progress * pinDistance}px, 0, 0)`;
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(rail);
    desktop.addEventListener("change", measure);
    window.addEventListener("scroll", update, { passive: true });
    measure();
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", measure);
      window.removeEventListener("scroll", update);
    };
  }, [pinDistance]);

  const sectionStyle = {
    "--pin-distance": `${pinDistance}px`,
  } as CSSProperties;

  return (
    <section
      id={`demo-project-${project.num}`}
      ref={sectionRef}
      tabIndex={-1}
      style={sectionStyle}
      className={`${styles.pinSection} relative scroll-mt-20 border-t border-white/10 xl:h-[calc(100svh+var(--pin-distance))] md:scroll-mt-24`}
      aria-labelledby={`demo-home-project-${project.num}`}
    >
      <div
        className={`${styles.pinFrame} bg-primary xl:sticky xl:top-0 xl:grid xl:h-svh xl:grid-cols-[340px_minmax(0,1fr)] xl:overflow-hidden`}
      >
        <aside
          className="relative z-10 flex flex-col overflow-y-auto border-white/10 bg-[#080808] px-5 py-10 [scrollbar-width:thin] md:px-8 xl:h-svh xl:border-r xl:px-9 xl:py-10"
          aria-label={`${project.title} project information`}
        >
          <div className="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.16em]">
            <span className="text-accent">{project.num}</span>
            <span className="text-white/55">
              {String(projectIndex + 1).padStart(2, "0")} /{" "}
              {String(projectCount).padStart(2, "0")}
            </span>
          </div>

          <h3
            id={`demo-home-project-${project.num}`}
            className="mt-7 text-[2.8rem] font-bold leading-none tracking-[-0.035em]"
          >
            {project.title}
          </h3>
          {liveLink && (
            <a
              href={liveLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-accent transition-colors hover:text-white"
            >
              {displayUrl(liveLink.href)} <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}

          <p className="mt-7 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/55">
            {project.category}
          </p>
          <p className="mt-5 text-[0.95rem] leading-[1.65] text-white/68">
            {firstSentence(project.summary)}
          </p>

          <div className="mt-8 border-t border-white/10">
            <details className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50 hover:text-white">
                <span
                  className="text-accent transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
                Technology
              </summary>
              <p className="pb-4 font-mono text-[0.68rem] leading-[1.8] text-white/60">
                {project.stack.join(" · ")}
              </p>
            </details>
            <details className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50 hover:text-white">
                <span
                  className="text-accent transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
                Resources
              </summary>
              <ul className="space-y-3 pb-5">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm text-white/60 hover:text-accent"
                    >
                      {link.label} <FiArrowUpRight aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <details className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50 hover:text-white">
                <span
                  className="text-accent transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
                Engineering
              </summary>
              <div className="space-y-5 pb-5 text-sm leading-[1.65] text-white/60">
                <div>
                  <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">
                    My contribution
                  </h4>
                  <p className="mt-2">{project.contribution}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">
                    Implementation
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {project.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-accent" aria-hidden="true">
                          /
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">
                    Architecture decision
                  </h4>
                  <p className="mt-2">{project.architecture}</p>
                </div>

                {project.note && (
                  <div>
                    <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">
                      Scope note
                    </h4>
                    <p className="mt-2">{project.note}</p>
                  </div>
                )}
              </div>
            </details>
          </div>

          <p className="mt-8 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55 xl:mt-auto">
            <span className="inline-flex items-center gap-2">
              Scroll to continue <FiArrowRight aria-hidden="true" />
            </span>
          </p>
        </aside>

        <div
          ref={viewportRef}
          className={`${styles.storyViewport} min-w-0 overflow-x-auto bg-[#111] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent xl:h-svh xl:overflow-hidden`}
          role="region"
          aria-label={`${project.title} visual project tour`}
          tabIndex={0}
        >
          <div
            ref={railRef}
            className={`${styles.storyRail} flex h-[68svh] min-h-[500px] w-max snap-x snap-mandatory items-stretch gap-[3px] will-change-transform xl:h-svh xl:min-h-0 xl:snap-none`}
          >
            {orderedStory.map((item, index) => {
              const sequence = `${project.num}.${String(index + 1).padStart(2, "0")}`;

              if (item.type === "narrative") {
                const bright = index % 2 === 0;
                return (
                  <article
                    key={`${item.title}-${index}`}
                    className={`flex w-[84vw] shrink-0 snap-center flex-col justify-between px-8 py-10 sm:w-[460px] md:px-12 md:py-14 xl:w-[440px] ${
                      bright
                        ? "bg-accent text-primary"
                        : "bg-[#ebe7df] text-primary"
                    }`}
                  >
                    <span className="font-mono text-[0.66rem] tracking-[0.16em] opacity-60">
                      {sequence}
                    </span>
                    <div>
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.15em] opacity-60">
                        {item.eyebrow}
                      </p>
                      <h4 className="mt-5 text-3xl font-bold leading-[1.05] tracking-[-0.025em] md:text-4xl">
                        {item.title}
                      </h4>
                      <p className="mt-6 text-base leading-[1.6] opacity-70">
                        {firstSentence(item.body)}
                      </p>
                    </div>
                  </article>
                );
              }

              if (item.type === "video") {
                return (
                  <PinnedVideo key={`${item.source}-${index}`} item={item} />
                );
              }

              return (
                <figure
                  key={`${item.source}-${index}`}
                  className="relative aspect-[1366/645] w-[92vw] shrink-0 snap-center self-center overflow-hidden bg-[#e8e8e6] sm:w-[88vw] xl:h-full xl:w-auto"
                >
                  <Image
                    src={item.source}
                    alt={item.alt}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1279px) 92vw, 1600px"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-14 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/75">
                    <span>{item.caption}</span>
                    <span>{sequence}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
