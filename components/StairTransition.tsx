"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

const StairTransition = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <div className="fixed top-0 left-0 right-0 z-40 flex h-screen w-screen flex-col pointer-events-none md:flex-row">
          <Stairs />
        </div>
        <motion.div
          className="fixed top-0 z-30 h-screen w-screen bg-primary pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.72, duration: 0.22, ease: "easeOut" }}
        />
      </div>
    </AnimatePresence>
  );
};

export default StairTransition;
