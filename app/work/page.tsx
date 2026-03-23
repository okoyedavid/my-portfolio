"use client";
import { motion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "frontend",
    title: "Project 1",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing",
    stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "JavaScript" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },

  {
    num: "02",
    category: "fullstack",
    title: "Project 2",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing",
    stack: [{ name: "Next.js" }, { name: "Tailwind.css" }, { name: "Node.js" }],
    image: "/assets/work/thumb2.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "frontend",
    title: "Project 3",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing",
    stack: [
      { name: "Next.js" },
      { name: "Tailwindcss" },
      { name: "JavaScript" },
    ],
    image: "/assets/work/thumb3.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="max-w-6xl mx-auto px-3.5 md:px-6">
        <div className="flex flex-col xl:flex-row xl:gap-7 ">
          <div className="w-full xl:w-[50%] xl:h-115 flex flex-col  xl:justify-between order-2 xl:order-0">
            <div className="flex flex-col gap-7 h-[50%] ">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>

              {/* Project Category */}

              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize ">
                {project.category} Project
              </h2>

              {/* Project Description */}
              <p className="text-white/60">{project.description} </p>

              <ul className="flex gap-4">
                {project.stack.map((item, index) => (
                  <li className="text-xl text-accent" key={index}>
                    {" "}
                    {item.name}
                    {/* Remove the last coma */}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>

              <div className="border border-white/20"> </div>
              <div className="flex items-center gap-4 ">
                {/* Live Project Button*/}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="flex w-17.5 h-17.5 rounded-full bg-white/5 justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* github Project Button*/}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-17.5 h-17.5 rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[50%] ">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="min-h-130 mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((item, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-100 relative group flex justify-center items-center bg-pink-50/20">
                    {/*overlay*/}
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/20 z-10"></div>

                    {/* image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-11 h-11 flex justify-center items-center transition-all duration-500"
                iconStyles="text-primary"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
