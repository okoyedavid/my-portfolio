"use client";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

//about data

const about = {
  title: "About Me",
  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
  info: [
    {
      fieldName: "Name",
      filedValue: "Luke Coleman",
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

const eduction = {
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
import { easeIn, motion } from "framer-motion";

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

          <div className="min-h-[70vh]">
            <TabsContent value="experience" className="w-full">
              Experience{" "}
            </TabsContent>

            <TabsContent value="education" className="w-full">
              Education
            </TabsContent>

            <TabsContent value="skills" className="w-full">
              Skills
            </TabsContent>

            <TabsContent value="about" className="w-full">
              About{" "}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
