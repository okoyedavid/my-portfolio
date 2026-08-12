"use client";

import { motion, useReducedMotion } from "framer-motion";

const Photo = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="aspect-square w-full max-w-100 flex items-center justify-center">
      <motion.svg
        className="w-75 h-75 xl:w-126.5 xl:h-126.5"
        viewBox="0 0 506 506"
        fill="none"
      >
        {/* base faint ring */}
        <circle
          cx="253"
          cy="253"
          r="240"
          stroke="#f59e0b"
          strokeWidth="14"
          opacity="0.15"
        />

        {/* glow layer (fake thickness) */}
        <motion.circle
          cx="253"
          cy="253"
          r="240"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="120 1500"
          opacity="0.08"
          animate={reduceMotion ? undefined : {
            strokeDashoffset: [0, -400, -900],
            rotate: [0, 10, -5, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "253px 253px" }}
        />

        {/* main arc */}
        <motion.circle
          cx="253"
          cy="253"
          r="240"
          stroke="#f59e0b"
          strokeWidth="23"
          strokeLinecap="round"
          strokeDasharray="110 1500"
          animate={reduceMotion ? undefined : {
            strokeDashoffset: [0, -300, -800],
            rotate: [0, 20, 360],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "253px 253px" }}
        />

        {/* small trailing arc (adds “shift”) */}
        <motion.circle
          cx="253"
          cy="253"
          r="240"
          stroke="#f59e0b"
          strokeWidth="23"
          strokeLinecap="round"
          strokeDasharray="40 1500"
          opacity="0.8"
          animate={reduceMotion ? undefined : {
            strokeDashoffset: [200, -200, -600],
            rotate: [180, 400],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "253px 253px" }}
        />

        {/* center pulse */}
        <motion.circle
          cx="253"
          cy="253"
          r="7"
          fill="#f59e0b"
          strokeWidth="23"
          strokeLinecap="round"
          strokeDasharray="110 1500"
          animate={reduceMotion ? undefined : {
            scale: [0.9, 1.15, 0.9],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "253px 253px" }}
        />
      </motion.svg>
    </div>
  );
};

export default Photo;
