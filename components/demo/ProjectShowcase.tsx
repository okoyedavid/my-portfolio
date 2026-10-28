"use client";

import WorkflowCarousel from "./WorkflowCarousel";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { demoProjectItems } from "./project-data";
import styles from "./ProjectShowcase.module.css";

const introductions = [
  "Aurex was built as a business payment platform.",
  "AureScore was built to power academic results and institutional workflows.",
  "Aurela was built to make fashion discovery feel effortless.",
];

type Props = {
  active: boolean;
  sceneReady: boolean;
  reducedMotion: boolean;
  projectIndex: number;
  onProjectChange: (index: number) => void;
  opened: boolean;
  onOpenChange: (opened: boolean) => void;
};

export default function ProjectShowcase({
  active,
  sceneReady,
  reducedMotion,
  projectIndex,
  onProjectChange,
  opened,
  onOpenChange,
}: Props) {
  const project = demoProjectItems[projectIndex];
  const viewButton = useRef<HTMLButtonElement>(null);
  const restorePreviewFocus = useRef(false);
  const changeProject = (next: number) => {
    onOpenChange(false);
    onProjectChange((next + demoProjectItems.length) % demoProjectItems.length);
  };
  const close = () => {
    restorePreviewFocus.current = true;
    onOpenChange(false);
  };
  return (
    <section
      className={`${styles.showcase} ${opened ? styles.isOpen : ""}`}
      aria-labelledby="projects-heading"
      data-project-showcase
      data-project={project.title}
      data-opened={opened}
      onKeyDown={(event) => {
        if (event.key === "Escape" && opened) close();
      }}
    >
      <header className={styles.heading}>
        <p>SELECTED WORK / 2026</p>
        <h2 id="projects-heading">My projects</h2>
      </header>
      <div className={styles.stage}>
        <button
          className={`${styles.projectArrow} ${styles.previousProject}`}
          type="button"
          onClick={() => changeProject(projectIndex - 1)}
          aria-label="Previous project"
        >
          <Arrow direction="left" />
        </button>
        <motion.div
          layout={!reducedMotion}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={opened ? styles.detailStage : styles.previewStage}
        >
          <AnimatePresence mode="wait" initial={false}>
            {opened ? (
              <motion.div
                key={`detail-${projectIndex}`}
                className={styles.details}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              >
                <div className={styles.detailBar}>
                  <span>
                    {project.num} / {project.title}
                  </span>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={close}
                  >
                    Back to projects <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <ProjectDetail
                  key={project.title}
                  projectIndex={projectIndex}
                  reducedMotion={reducedMotion}
                  active={active}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`preview-${projectIndex}`}
                onAnimationComplete={() => {
                  if (restorePreviewFocus.current) {
                    viewButton.current?.focus();
                    restorePreviewFocus.current = false;
                  }
                }}
                className={styles.preview}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
              >
                <div className={styles.wordWindow}>
                  <h3
                    className={
                      sceneReady && !reducedMotion
                        ? styles.screenReader
                        : styles.fallbackWord
                    }
                  >
                    {project.title}
                  </h3>
                  <span className={styles.wordDescription}>
                    Particle wordmark for {project.title}
                  </span>
                </div>
                <motion.div
                  className={styles.previewActions}
                  style={{ x: "-50%" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.85,
                    duration: 0.4,
                  }}
                >
                  <button
                    ref={viewButton}
                    type="button"
                    className={styles.viewButton}
                    onClick={() => onOpenChange(true)}
                    aria-label={`View ${project.title}`}
                  >
                    View project <span aria-hidden="true">↗</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <button
          className={`${styles.projectArrow} ${styles.nextProject}`}
          type="button"
          onClick={() => changeProject(projectIndex + 1)}
          aria-label="Next project"
        >
          <Arrow direction="right" />
        </button>
      </div>
      <nav className={styles.projectTabs} aria-label="Choose a project">
        {demoProjectItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => changeProject(index)}
            aria-current={index === projectIndex ? "true" : undefined}
            className={index === projectIndex ? styles.selectedTab : undefined}
          >
            <span>{item.num}</span>
            {item.title}
          </button>
        ))}
      </nav>
    </section>
  );
}

function ProjectDetail({
  projectIndex,
  reducedMotion,
  active,
}: {
  projectIndex: number;
  reducedMotion: boolean;
  active: boolean;
}) {
  const project = demoProjectItems[projectIndex];
  const text = introductions[projectIndex];
  const [letters, setLetters] = useState(0);
  const images = project.story.filter((item) => item.type === "image");
  const complete = reducedMotion || letters >= text.length;
  useEffect(() => {
    if (reducedMotion || !active) return;
    const timer = window.setInterval(
      () =>
        setLetters((n) => {
          if (n >= text.length) {
            window.clearInterval(timer);
            return n;
          }
          return n + 1;
        }),
      26,
    );
    return () => window.clearInterval(timer);
  }, [text, reducedMotion, active]);
  return (
    <>
      <div className={styles.introduction}>
        <h3>
          <span className={styles.screenReader}>{text}</span>
          <span aria-hidden="true">
            {reducedMotion ? text : text.slice(0, letters)}
            {!complete && <span className={styles.caret}>|</span>}
          </span>
        </h3>
        {complete && projectIndex === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Business workspaces, secure team access and payment workflows.
            Payment execution is in development.
          </motion.p>
        )}
      </div>
      <div className={styles.mediaSlot} aria-busy={!complete}>
        <AnimatePresence mode="wait">
          {complete && (
            <motion.div
              key="gallery"
              className={styles.gallery}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
            >
              <WorkflowCarousel
                images={images}
                stack={project.stack.slice(0, 4)}
                projectName={project.title}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="42"
      height="22"
      viewBox="0 0 42 22"
      fill="none"
      aria-hidden="true"
      style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M1 11h38M30 2l9 9-9 9"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
