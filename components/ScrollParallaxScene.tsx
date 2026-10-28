"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./ScrollParallaxScene.module.css";
import RingsScrollJourney from "./RingsScrollJourney";

/** React migration of the supplied scroll effect example, based on Unfold's
 * Northface parallax scene. Assets are local; Motion owns the scroll subscription.
 */
export default function ScrollParallaxScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskId = `mountain-cloud-${useId().replace(/:/g, "")}`;
  const titleId = `${maskId}-title`;
  const descriptionId = `${maskId}-description`;
  const reducedMotion = useReducedMotion();
  const [arrowHovered, setArrowHovered] = useState(false);
  const { scrollY } = useScroll();
  const start = useMotionValue(0);
  const end = useMotionValue(1);
  const scrollProgress = useTransform(() =>
    Math.max(
      0,
      Math.min(
        1,
        (scrollY.get() - start.get()) / Math.max(1, end.get() - start.get()),
      ),
    ),
  );
  const progress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });
  const skyY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -200],
  );
  const cloud1Y = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [100, 100] : [100, -800],
  );
  const cloud2Y = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [-150, -150] : [-150, -500],
  );
  const cloud3Y = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [-50, -50] : [-50, -650],
  );
  const mountainBackY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [-10, -10] : [-10, -100],
  );
  const mountainMiddleY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [-30, -30] : [-30, -250],
  );
  const mountainFrontY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [-50, -50] : [-50, -600],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => {
      const inset = 0;
      const top = section.getBoundingClientRect().top + window.scrollY;
      start.set(top - inset);
      end.set(
        Math.max(
          top - inset + 1,
          top + section.offsetHeight - window.innerHeight,
        ),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [start, end]);

  function exploreFurther() {
    window.scrollTo({ top: end.get(), behavior: "smooth" });
  }

  return (
    <div className={styles.demo} data-intro-ready="true">
      <section
        ref={sectionRef}
        className={styles.journey}
        aria-label="Mountain parallax introduction"
      >
        <div className={styles.viewport}>
          <svg
            className={styles.scene}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            role="group"
            aria-labelledby={`${titleId} ${descriptionId}`}
          >
            <title id={titleId}>
              Hi there, my name is David Okoye, a software engineer
            </title>
            <desc id={descriptionId}>
              Scroll through the clouds to reveal: My name is David Okoye, a
              software engineer. Continue for a journey through three ice rings.
            </desc>
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1200"
                height="800"
                style={{ maskType: "luminance" }}
              >
                <motion.g style={{ y: cloud1Y }}>
                  <rect fill="white" width="1200" height="801" y="799" />
                  <image
                    href="/scroll-effect/cloud1Mask.jpg"
                    width="1200"
                    height="800"
                  />
                </motion.g>
              </mask>
            </defs>
            <g className={styles.landscape} data-landscape="true">
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/sky.webp"
                width="1200"
                height="590"
                style={{ y: skyY }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/mountBg.webp"
                width="1200"
                height="800"
                style={{ y: mountainBackY }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/mountMg.webp"
                width="1200"
                height="800"
                style={{ y: mountainMiddleY }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/cloud2.webp"
                width="1200"
                height="800"
                style={{ y: cloud2Y }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/mountFg.webp"
                width="1200"
                height="800"
                style={{ y: mountainFrontY }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/cloud1.png"
                width="1200"
                height="800"
                style={{ y: cloud1Y }}
              />
              <motion.image
                aria-hidden="true"
                href="/scroll-effect/cloud3.png"
                width="1200"
                height="800"
                style={{ y: cloud3Y }}
              />
              <g className={styles.greetingPosition}>
                <motion.text
                  className={styles.sceneWord}
                  fill="white"
                  x="600"
                  y="200"
                  textAnchor="middle"
                  aria-hidden="true"
                >
                  Hi there,
                </motion.text>
                <motion.polyline
                  aria-hidden="true"
                  fill="white"

                  points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
                  animate={{ y: arrowHovered && !reducedMotion ? 10 : 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 120, damping: 12 }
                  }
                />
              </g>
              <motion.g mask={`url(#${maskId})`} aria-hidden="true">
                <rect fill="white" width="1200" height="800" />
                <text
                  className={styles.sceneWord}
                  textAnchor="middle"
                  fill="#162a43"
                >
                  <tspan className={styles.nameIntro} x="600" y="355">
                    My name is
                  </tspan>
                  <tspan className={styles.nameWord} x="600" y="455">
                    David Okoye
                  </tspan>
                  <tspan className={styles.nameRole} x="600" y="510">
                    a software engineer
                  </tspan>
                </text>
              </motion.g>
              <foreignObject
                className={styles.greetingPosition}
                x="550"
                y="220"
                width="100"
                height="100"
              >
                <button
                  type="button"
                  className={styles.arrowButton}
                  aria-label="Scroll to meet David Okoye"
                  onClick={exploreFurther}
                  onPointerEnter={() => setArrowHovered(true)}
                  onPointerLeave={() => setArrowHovered(false)}
                  onFocus={() => setArrowHovered(true)}
                  onBlur={() => setArrowHovered(false)}
                />
              </foreignObject>
            </g>
          </svg>
          <span className={styles.scrollHint} aria-hidden="true">
            SCROLL TO MEET DAVID
          </span>
          <div className={styles.reducedName}>
            Hi there,
            <br />
            my name is David Okoye.
            <span className={styles.reducedRole}>a software engineer</span>
          </div>
        </div>
      </section>
      <RingsScrollJourney />
      <footer id="demo-outro" className={styles.ending}>
        <Link href="/" className={styles.homeLink}>
          Back to portfolio <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </div>
  );
}
