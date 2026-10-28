"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectShowcase from "./demo/ProjectShowcase";
import styles from "./RingsScrollJourney.module.css";

const RingsTripViewport = dynamic(() => import("./RingsTripViewport"), {
  ssr: false,
});

/** A reversible camera journey, held for the statement and interactive projects. */
export default function RingsScrollJourney() {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const scrollSpan = useMotionValue(1);
  const invitationTravel = useMotionValue(0);
  const [paused, setPaused] = useState(true);
  const near = useInView(section, { margin: "900px 0px", once: true });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 32,
    restDelta: 0.0001,
  });
  const progress = reduce ? scrollYProgress : smoothProgress;
  // Move the heading to 20vh before advancing the camera. Measure the actual
  // two-line heading so this threshold also holds on narrow/short screens.
  useEffect(() => {
    const measure = () => {
      if (!section.current || !viewport.current || !heading.current) return;
      const height = viewport.current.clientHeight;
      scrollSpan.set(Math.max(1, section.current.offsetHeight - height));
      invitationTravel.set(Math.max(0, height * 0.3 - heading.current.offsetHeight / 2));
    };
    const observer = new ResizeObserver(measure);
    for (const node of [section.current, viewport.current, heading.current])
      if (node) observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, [scrollSpan, invitationTravel]);
  const travel = useTransform(() => {
    const start = invitationTravel.get() / scrollSpan.get();
    return Math.max(0, Math.min(1, (progress.get() - start) / (0.5 - start)));
  });
  useMotionValueEvent(travel, "change", (value) => setPaused(value <= 0));
  const camera = useTransform(progress, [0.64, 0.8], [0, 1]);
  const invitationOpacity = useTransform(() => {
    const start = invitationTravel.get() / scrollSpan.get();
    return 1 - Math.max(0, Math.min(1, (progress.get() - start) / 0.055));
  });
  const invitationY = useTransform(() =>
    -Math.min(progress.get() * scrollSpan.get(), invitationTravel.get() + scrollSpan.get() * 0.055),
  );
  const statementOpacity = useTransform(
    progress,
    [0.5, 0.57, 0.64, 0.71],
    [0, 1, 1, 0],
  );
  const statementY = useTransform(
    progress,
    [0.5, 0.57, 0.71],
    reduce ? [0, 0, 0] : [24, 0, -36],
  );
  const showcaseOpacity = useTransform(progress, [0.76, 0.83], [0, 1]);
  const showcaseY = useTransform(
    progress,
    [0.76, 0.83],
    reduce ? [0, 0] : [35, 0],
  );
  const skipOpacity = useTransform(progress, [0.7, 0.76], [1, 0]);
  useMotionValueEvent(progress, "change", (value) => setActive(value >= 0.78));
  return (
    <section
      ref={section}
      className={styles.journey}
      aria-labelledby="trip-title"
      data-ring-journey
    >
      <span
        id="demo-end"
        className={styles.statementAnchor}
        aria-hidden="true"
      />
      <span
        id="demo-projects"
        className={styles.projectsAnchor}
        aria-hidden="true"
      />
      <div ref={viewport} className={styles.viewport}>
        <div className={styles.scene}>
          {near && (
            <RingsTripViewport
              progress={travel}
              camera={camera}
              projectIndex={projectIndex}
              opened={opened}
              reducedMotion={Boolean(reduce)}
              paused={paused}
              onReadyChange={setSceneReady}
            />
          )}
        </div>
        <motion.div
          className={styles.invitation}
          style={{ opacity: invitationOpacity }}
        >
          <motion.h2 ref={heading} id="trip-title" style={{ y: invitationY }}>
            Let’s take you <br />
            for a trip.
          </motion.h2>
          <span className={styles.inviteHint}>
            SCROLL TO BEGIN <span aria-hidden="true">↓</span>
          </span>
        </motion.div>
        <motion.div
          className={styles.endingMessage}
          style={{ opacity: statementOpacity, y: statementY }}
        >
          <h1 id="demo-work-statement" className={styles.statement}>
            I build the websites
            <br />
            which power the internet.
          </h1>
        </motion.div>
        <motion.a
          className={styles.skip}
          style={{
            opacity: skipOpacity,
            pointerEvents: active ? "none" : "auto",
          }}
          href="#demo-projects"
          tabIndex={active ? -1 : 0}
        >
          Skip to projects <span aria-hidden="true">↗</span>
        </motion.a>
        <motion.div
          className={styles.projects}
          style={{
            opacity: showcaseOpacity,
            y: showcaseY,
            pointerEvents: active ? "auto" : "none",
          }}
          inert={!active}
          aria-hidden={!active}
        >
          <Link
            className={styles.brand}
            href="/"
            aria-label="David Okoye — home"
          >
            David
          </Link>
          <ProjectShowcase
            active={active}
            sceneReady={sceneReady}
            reducedMotion={Boolean(reduce)}
            projectIndex={projectIndex}
            onProjectChange={setProjectIndex}
            opened={opened}
            onOpenChange={setOpened}
          />
          <Link className={styles.continueLink} href="/#contact">
            Let’s work together <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
