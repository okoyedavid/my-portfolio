"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const PageTransition = ({ children }: Props) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return children;

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.72, duration: 0.22, ease: "easeOut" }}
          className="fixed top-0 z-30 h-screen w-screen bg-primary pointer-events-none"
        />
      </div>
      {children}
    </AnimatePresence>
  );
};

export default PageTransition;
