"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  educationItems,
  experienceItems,
  siteConfig,
  skills as skillNames,
} from "@/lib/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

const about = {
  title: "About Me",
  description: siteConfig.summary,
  info: [
    { fieldName: "Name", filedValue: siteConfig.name },
    { fieldName: "Phone", filedValue: siteConfig.phone },
    { fieldName: "Experience", filedValue: "3+ years" },
    { fieldName: "Location", filedValue: siteConfig.location },
    { fieldName: "Email", filedValue: siteConfig.email },
    { fieldName: "Freelance", filedValue: "Available" },
    { fieldName: "Languages", filedValue: "English" },
    {
      fieldName: "Portfolio",
      filedValue: siteConfig.website.replace("https://", ""),
    },
  ],
};

const experience = {
  title: "Experience",
  description:
    "Resume-backed roles spanning freelance delivery, academic product collaboration, and industrial training.",
  items: experienceItems,
};

const education = {
  title: "Education & Certificates",
  description:
    "A computer science foundation supported by practical frontend certifications.",
  items: educationItems,
};

const skills = {
  title: "Core Skills",
  description:
    "Technologies and delivery strengths directly reflected in the resume and current portfolio.",
  skillList: [
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3 />, name: "CSS3" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaNodeJs />, name: "Node.js" },
  ],
};

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
      <div className="max-w-6xl mx-auto px-3.5 md:px-6">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-15"
        >
          <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh]">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-7 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>

                <ScrollArea className="h-100">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    {experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-[#232329] min-h-46 flex flex-col justify-center items-center lg:items-start gap-3 py-6 px-10 rounded-xl"
                      >
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-75 text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                        <p className="text-sm text-white/60 text-center lg:text-left">
                          {item.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-7 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>

                <ScrollArea className="h-80">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-[#232329] min-h-46 flex flex-col group justify-center items-center lg:items-start gap-3 py-6 px-10 rounded-xl"
                      >
                        <span className="text-accent">{item.duration}</span>
                        <div className="w-full flex justify-between  items-center">
                          <h3 className="text-xl max-w-75 text-center lg:text-left">
                            {item.degree}
                          </h3>
                          {item.href && (
                            <Link
                              href={item.href}
                              className="flex justify-center items-center hover:-rotate-90 w-12.5 h-12.5 rounded-full bg-white group-hover:bg-accent transiton-all duration-500"
                            >
                              <BsArrowDownRight className="text-primary text-2xl" />{" "}
                            </Link>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.institution}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-7 text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-7">
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

                <div className="flex flex-wrap gap-3">
                  {skillNames.slice(7).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-7">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>

                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-154 mx-auto xl:mx-0">
                  {about.info.map((item, index) => (
                    <li
                      className="flex items-center justify-center xl:justify-start gap-4"
                      key={index}
                    >
                      <span className="text-white/60">{item.fieldName}</span>
                      <span className="text-xl break-all">
                        {item.filedValue}
                      </span>
                    </li>
                  ))}
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
