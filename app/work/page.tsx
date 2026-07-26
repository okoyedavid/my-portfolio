"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import Link from "next/link";

import WorkSliderBtns from "@/components/WorkSliderBtns";
import { projectItems as projects } from "@/lib/site-data";

const Work = () => {
  const [project, setProject] = useState<(typeof projects)[number]>(
    projects[0],
  );

  const [openGallery, setOpenGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setProject(projects[swiper.activeIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      <div className="max-w-6xl mx-auto px-3.5  py-12 md:px-6">
        <div className="flex flex-col xl:flex-row xl:gap-7 min-w-0">
          {/* PROJECT INFO */}
          <div className="w-full min-w-0 xl:w-[50%] xl:h-115 flex flex-col order-2 xl:order-0">
            {" "}
            <div className="flex flex-col gap-7">
              <div className="text-6xl md:text-7xl xl:text-8xl leading-none font-extrabold text-transparent text-outline">
                {" "}
                {project.num}
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-[42px] font-bold leading-none text-white capitalize wrap-break-word">
                {project.title}
              </h2>

              <div>
                <p className="text-sm uppercase tracking-wider text-accent">
                  {project.category} / {project.status}
                </p>

                <p className="mt-3 text-white/60 wrap-break-word">
                  {project.summary}
                </p>
              </div>

              <ul className="grid gap-2 text-sm text-white/70">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2 min-w-0">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-3">
                {project.stack.map((item, index) => (
                  <li className="text-sm text-accent" key={item}>
                    {item}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>

              <div className="border border-white/20" />

              <div className="flex items-center gap-4">
                {project.live && (
                  <Link href={project.live} target="_blank" rel="noreferrer">
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
                )}

                {project.github && (
                  <Link href={project.github} target="_blank" rel="noreferrer">
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
                )}
              </div>
            </div>
          </div>

          {/* IMAGE SLIDER */}
          <div className="max-w-screen flex items-center justify-center min-w-0 xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:min-h-130 mb-12 max-w-[98%] mx-auto"
              onSlideChange={handleSlideChange}
            >
              {projects.map((item) => (
                <SwiperSlide key={item.title}>
                  <div className="relative group aspect-4/3 w-full">
                    <div className="grid grid-cols-2 gap-2 md:gap-3 w-full h-full">
                      {item.images.slice(0, 4).map((image, index) => (
                        <button
                          key={image}
                          onClick={() => {
                            setSelectedImageIndex(index);
                            setProject(item);
                            setOpenGallery(true);
                          }}
                          className="relative overflow-hidden rounded-lg"
                        >
                          <Image
                            src={image}
                            alt={`${item.title} screenshot ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns
                containerStyles="flex gap-2 absolute  right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-11 h-11 flex justify-center items-center transition-all duration-500"
                iconStyles="text-primary"
              />
            </Swiper>
          </div>
        </div>
      </div>

      {/* IMAGE DIALOG */}

      <Dialog open={openGallery} onOpenChange={setOpenGallery}>
        <DialogContent className=" sm:max-w-5xl bg-black/90 p-3 md:p-6">
          <DialogTitle className="sr-only">
            {project.title} screenshots
          </DialogTitle>

          <Swiper
            initialSlide={selectedImageIndex}
            slidesPerView={1}
            navigation
            className="w-full h-[60vh] md:h-[80vh]"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={image}>
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}

            <WorkSliderBtns
              containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
              btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-11 h-11 flex justify-center items-center transition-all duration-500"
              iconStyles="text-primary"
            />
          </Swiper>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
};

export default Work;
