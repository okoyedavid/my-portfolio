import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

// calculate the reverse index for staggered delay
const reverseIndex = (index: number): number => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};

const Stairs = () => {
  return (
    <>
      {/* Render 6 motion divs each representing a step of the stairs
  each div will ahve the same animation defined by the stairs animation object 
  the delay for each div is calculated based on its reversed index created a staggered effect decreasing delay for each subsequent step
  */}

      {[...Array(6)].map((_, index) => {
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
              delay: reverseIndex(index) * 0.1, // staggered delay based on reverse index
            }}
            className="h-full w-full bg-white relative"
          ></motion.div>
        );
      })}
    </>
  );
};

export default Stairs;
