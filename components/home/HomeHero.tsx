import { siteConfig } from "@/lib/site-data";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import HeroMedia from "../HeroMedia";
import { Button } from "../ui/button";
import Reveal from "./Reveal";

export default function HomeHero() {
  return (
    <section id="top" className="relative isolate -mt-20 flex min-h-svh scroll-mt-20 items-center overflow-hidden pt-20 md:-mt-[6.25rem] md:pt-[6.25rem] xl:-mt-[7.25rem] xl:pt-[7.25rem]">
      <HeroMedia />
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-5xl">
          <Reveal delay={0.78} distance={14}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent md:text-sm">
              {siteConfig.role}
            </p>
          </Reveal>
          <Reveal delay={0.86} distance={18}>
            <h1 className="h1 mt-5 max-w-4xl">
              I build secure products and
              <span className="text-accent"> business systems.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.94} distance={16}>
            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-white/75 md:text-lg">
              I build responsive SaaS interfaces and TypeScript backends with
              React, Next.js, Node.js, authentication, role-based access control
              and durable business workflows.
            </p>
          </Reveal>

          <Reveal delay={1.02} distance={14}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#selected-work">View Selected Work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1.1} distance={12}>
            <nav
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
              aria-label="Professional links"
            >
              <a
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-accent"
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden="true" /> GitHub
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-accent"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin aria-hidden="true" /> LinkedIn
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <Link
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-accent"
                href="#resume"
              >
                R&eacute;sum&eacute; <FiArrowRight aria-hidden="true" />
              </Link>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
