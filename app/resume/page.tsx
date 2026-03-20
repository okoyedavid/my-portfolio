"use client";
import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";

import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

//about data

const about = {
  title: "About Me",
  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
  info: [
    {
      fieldName: "Name",
      filedValue: "David Okoye",
    },

    {
      fieldName: "Phone",
      filedValue: "(+234) 916 380 8118",
    },
    {
      fieldName: "Experience",
      filedValue: "5+ years",
    },
    {
      fieldName: "Nationality",
      filedValue: "Nigerian",
    },
    {
      fieldName: "Email",
      filedValue: "Okoyedav7@gmail.com",
    },
    {
      fieldName: "Freelance",
      filedValue: "Available",
    },
    {
      fieldName: "Languages",
      filedValue: "English, French",
    },
  ],
};

const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
  items: [
    {
      company: "Tech Solutions Inc.",
      position: "Full Stack Developer",
      duration: "2022 - present",
    },
    {
      company: "Tech Solutions Inc.",
      position: "Full Stack Developer",
      duration: "2022 - present",
    },
    {
      company: "Raadaa Technologies.",
      position: "Front-end Developer Intern",
      duration: "2025 - present",
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
  items: [
    {
      institution: "Goverment Science Secondary School pyakasa, maitama Abuja.",
      degree: "First School leaving Certificate",
      duration: "2017 - 2020",
    },
    {
      institution: "Enugu State University of Technology",
      degree: "Bsc. Computer Science",
      duration: "2022 - 2026",
    },
    {
      institution: "FreeCodeCamp.",
      degree: "Responsive Web Design",
      duration: "2022",
    },
    {
      institution: "FreeCodeCamp.",
      degree: "Legacy Javascript Algorithms and Data Structures V7",
      duration: "2022",
    },
    {
      institution: "Udemy Courses.",
      degree: "Ultimate React Course",
      duration: "2024",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, maxime, possimus labore ea officiis a iure quo non rerum quasi quibusdam. Animi aperiam consectetur ",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "Html 5",
    },
    {
      icon: <FaCss3 />,
      name: "Css 3",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-8"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row  gap-15"
        >
          <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] ">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-7 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0 ">
                  {experience.description}
                </p>

                <ScrollArea className="h-100 ">
                  <ul className=" grid grid-cols-1 lg:grid-cols-2 gap-7 ">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 flex flex-col justify-center items-center lg:items-start gap-1 py-6 px-10 rounded-xl "
                        >
                          <span className="text-accent">{item.duration}</span>

                          <h3 className="text-xl max-w-65 min-h-15 text-center lg:text-left ">
                            {item.position}
                          </h3>

                          <div className="flex items-center gap-3 ">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <p className="text-white/60 ">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-7 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0 ">
                  {education.description}
                </p>

                <ScrollArea className="h-100 ">
                  <ul className=" grid grid-cols-1 lg:grid-cols-2 gap-7 ">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 flex flex-col justify-center items-center lg:items-start gap-1 py-6 px-10 rounded-xl "
                        >
                          <span className="text-accent">{item.duration}</span>

                          <h3 className="text-xl max-w-65 min-h-15 text-center lg:text-left ">
                            {item.degree}
                          </h3>

                          <div className="flex items-center gap-3 ">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <p className="text-white/60 ">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-7  text-center xl:text-left ">
                  <h3 className="text-4xl font-bold "> {skills.title} </h3>
                  <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-7 ">
                  {skills.skillList.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-37.5 bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-7 ">
                <h3 className="text-4xl font-bold ">{about.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>

                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-154 mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        className="flex items-center justify-center xl:justify-start gap-4 "
                        key={index}
                      >
                        <span className="text-white/60">{item.fieldName} </span>
                        <span className="text-xl">{item.filedValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
