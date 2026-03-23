"use client";

import { siteConfig } from "@/lib/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", description: siteConfig.phone },
  { icon: <FaEnvelope />, title: "Email", description: siteConfig.email },
  {
    icon: <FaMapMarkedAlt />,
    title: "Location",
    description: siteConfig.location,
  },
];

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="max-w-6xl mx-auto px-3.5 md:px-6">
        <div className="grid gap-7 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl bg-[#27272c] p-10">
            <h3 className="text-4xl text-accent">Let&apos;s work together</h3>

            <p className="mt-6 text-white/60">
              For frontend product work, interface refinement, or a Next.js
              build that needs stronger structure and polish, direct contact is
              the cleanest route. This page now uses real actions instead of a
              non-functional demo form.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="rounded-full bg-accent px-6 py-3 font-medium text-primary transition-colors hover:bg-accent-hover"
              >
                Email David
              </Link>
              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-colors hover:border-accent hover:text-accent"
              >
                Open GitHub
              </Link>
              <Link
                href={siteConfig.resume}
                target="_blank"
                className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-colors hover:border-accent hover:text-accent"
              >
                Read Resume
              </Link>
            </div>
          </div>

          <div className="flex items-center xl:justify-end mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-13 h-13 xl:w-18 xl:h-18 bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>

                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl break-all">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
