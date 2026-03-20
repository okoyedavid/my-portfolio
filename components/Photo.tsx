"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const Photo = () => {
  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
        }}
      >
        <div className="mix-blend-light absolute w-74.5 h-74.5 xl:w-124.5 xl:h-124.5">
          <Image
            src="/david.png"
            alt="photo"
            priority
            quality={100}
            fill
            className="rounded-full w-80 h-80 object-contain"
          />
        </div>
      </motion.div>

      <motion.svg
        className={"w-75 xl:w-126.5 h-75 z-10 relative xl:h-126.5 "}
        fill="transparent"
        viewBox={"0 0 506 506"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <motion.circle
          cx="253"
          cy="253"
          r="240"
          stroke="#00ff99"
          strokeWidth="4"
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          initial={{ strokeDasharray: "24 10 0 0 " }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            rotate: [120, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.svg>
    </div>
  );
};

export default Photo;
