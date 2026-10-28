"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoProjectStoryItem } from "./project-data";
import styles from "./WorkflowCarousel.module.css";

type Screenshot = Extract<DemoProjectStoryItem, { type: "image" }>;
const notes: Record<string, string> = {
  "/assets/work/aurex/aurex.png":
    "The public landing page introduces Aurex’s business-payment tools and guides visitors into the product.",
  "/assets/work/aurex/aurex2.png":
    "The product overview explains Aurex’s capabilities before a business creates its workspace.",
  "/assets/work/aurex/aurex3.png":
    "The sign-in screen is the entry point to protected business accounts and team workspaces.",
  "/assets/work/aurex/aurex4.png":
    "The operations dashboard brings team access, employee records, invitations and account activity into one workspace.",
  "/assets/work/aurescore/aurescore.webp":
    "The public experience introduces the result workflow: score entry, review, approval and publication.",
  "/assets/work/aurescore/aurescore2.jpg":
    "This page explains how departments, faculties and universities participate in the same result process.",
  "/assets/work/aurescore/aurescore 3.png":
    "The integration documentation shows developers how to add Sign in with AureScore to another application.",
  "/assets/work/aurescore/aurescore 4.png":
    "The account sign-in screen protects access to institutional and personal academic workspaces.",
  "/assets/work/aurescore/aurescore 5.png":
    "The workspace dashboard gives users their institutional context, invitations and the next academic tasks to review.",
  "/assets/work/aurela/aurela.png":
    "The fashion storefront combines editorial imagery with a clear route into product discovery.",
  "/assets/work/aurela/aurela2.png":
    "The browsing experience gives products space and helps shoppers explore the collection.",
  "/assets/work/aurela/aurela3.png":
    "The member sign-in screen continues the storefront’s visual style through account access.",
  "/assets/work/aurela/aurela4.png":
    "The product page brings imagery, availability, variants, reviews and purchase actions together.",
};

/** Expanding screenshot cards; React owns selection, gestures and keyboard controls. */
export default function WorkflowCarousel({
  images,
  projectName,
  stack,
  reducedMotion,
}: {
  images: readonly Screenshot[];
  projectName: string;
  stack: readonly string[];
  reducedMotion: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const touch = useRef({ x: 0, y: 0 });
  const center = useCallback(() => {
    const viewport = wrap.current;
    const card = cards.current[current];
    if (!viewport || !card) return;
    const mobile = matchMedia("(max-width: 767px)").matches;
    viewport.scrollTo({
      left: mobile
        ? 0
        : card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2,
      top: mobile
        ? card.offsetTop - (viewport.clientHeight - card.clientHeight) / 2
        : 0,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [current, reducedMotion]);
  useEffect(() => {
    const frame = requestAnimationFrame(center);
    const observer = new ResizeObserver(center);
    if (wrap.current) observer.observe(wrap.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [center]);
  const go = (step: number) =>
    setCurrent((index) =>
      Math.max(0, Math.min(images.length - 1, index + step)),
    );
  return (
    <section
      className={styles.carousel}
      aria-label={`${projectName} screenshots`}
      aria-roledescription="carousel"
      data-workflow-carousel
      onKeyDown={(event) => {
        if (
          ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(
            event.key,
          )
        ) {
          event.preventDefault();
          const next = Math.max(
            0,
            Math.min(
              images.length - 1,
              current +
                (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1),
            ),
          );
          setCurrent(next);
          cards.current[next]
            ?.querySelector("button")
            ?.focus({ preventScroll: true });
        }
      }}
    >
      <div className={styles.head}>
        <p>
          EXPLORE THE PRODUCT{" "}
          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </p>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={current === images.length - 1}
            aria-label="Next screenshot"
          >
            ›
          </button>
        </div>
      </div>
      <div className={styles.slider} ref={wrap}>
        <div
          className={styles.track}
          onTouchStart={(event) => {
            touch.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={(event) => {
            const mobile = matchMedia("(max-width: 767px)").matches;
            const delta = mobile
              ? event.changedTouches[0].clientY - touch.current.y
              : event.changedTouches[0].clientX - touch.current.x;
            if (Math.abs(delta) > 60) go(delta > 0 ? -1 : 1);
          }}
        >
          {images.map((image, index) => (
            <article
              key={image.source}
              ref={(node) => {
                cards.current[index] = node;
              }}
              className={styles.card}
              data-active={current === index}
              onPointerMove={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  matchMedia("(hover: hover)").matches
                )
                  setCurrent(index);
              }}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget) center();
              }}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={image.source}
                  alt={image.alt}
                  fill
                  sizes={
                    current === index
                      ? "(max-width: 767px) 90vw, 1000px"
                      : "80px"
                  }
                  style={{ objectFit: current === index ? "contain" : "cover" }}
                />
              </div>
              <div className={styles.content}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4>{image.caption}</h4>
                {current === index && (
                  <>
                    <p id={`screen-note-${index}`} aria-live="polite">
                      {notes[image.source] || image.alt}
                    </p>
                    <ul
                      className={styles.stack}
                      aria-label={`${projectName} technology stack`}
                    >
                      {stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <button
                type="button"
                className={styles.selectCard}
                aria-label={`Show screenshot ${index + 1}: ${image.caption}`}
                aria-pressed={current === index}
                aria-describedby={
                  current === index ? `screen-note-${index}` : undefined
                }
                tabIndex={current === index ? 0 : -1}
                onClick={() => setCurrent(index)}
              />
            </article>
          ))}
        </div>
      </div>
      <div className={styles.dots} aria-label="Choose screenshot">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.source}
            aria-label={`Show screenshot ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
