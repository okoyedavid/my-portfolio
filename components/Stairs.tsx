"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DESKTOP_STEPS = 6;
const MOBILE_STEPS = 4;
const MOBILE_BREAKPOINT = 768;

const createStairAnimation = (isMobile: boolean) => ({
  initial: isMobile
    ? {
        left: "0%",
      }
    : {
        top: "0%",
      },
  animate: isMobile
    ? {
        left: "100%",
      }
    : {
        top: "100%",
      },
  exit: isMobile
    ? {
        left: ["100%", "0%"],
      }
    : {
        top: ["100%", "0%"],
      },
});

const reverseIndex = (index: number, totalSteps: number): number => {
  return totalSteps - index - 1;
};

const Stairs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const totalSteps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS;
  const stairAnimation = createStairAnimation(isMobile);

  return (
    <>
      {[...Array(totalSteps)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index, totalSteps) * 0.1,
            }}
            className="relative flex-1 bg-white"
          ></motion.div>
        );
      })}
    </>
  );
};

export default Stairs;
