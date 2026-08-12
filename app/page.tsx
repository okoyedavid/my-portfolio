import { Button } from "@/components/ui/button";
import {
  coreEngineeringAreas,
  experienceItems,
  projectItems,
  siteConfig,
  skills,
} from "@/lib/site-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "David Okoye | Full-Stack TypeScript Developer",
  alternates: { canonical: "/" },
};

const featuredProject = projectItems[0];
const supportingProjects = projectItems.slice(1);

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-3.5 pb-16 pt-6 md:px-6 md:pb-20 md:pt-10">
        <div className="max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent md:text-base">
            {siteConfig.role}
          </p>
          <h1 className="mt-5 max-w-5xl text-[42px] font-semibold leading-[1.08] sm:text-6xl xl:text-[78px]">
            I build secure products and
            <span className="text-accent"> business systems.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-base text-white/75 md:text-lg">
            I build responsive SaaS interfaces and TypeScript backends with
            React, Next.js, Node.js, authentication, role-based access control
            and durable business workflows.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#selected-work">View Selected Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>

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
              href="/resume"
            >
              Résumé <FiArrowRight aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </section>

      <section
        className="border-y border-white/10 bg-surface/40 py-10"
        aria-labelledby="core-areas-title"
      >
        <div className="mx-auto grid max-w-6xl gap-7 px-3.5 md:grid-cols-[0.65fr_1.35fr] md:px-6">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-accent">
              Engineering focus
            </p>
            <h2
              id="core-areas-title"
              className="mt-2 text-2xl font-semibold md:text-3xl"
            >
              What I work on
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {coreEngineeringAreas.map((area) => (
              <li
                key={area}
                className="rounded-lg border border-white/10 bg-primary/60 px-4 py-3 text-sm text-white/80"
              >
                <span className="mr-3 text-accent" aria-hidden="true">
                  /
                </span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="selected-work"
        className="mx-auto max-w-6xl scroll-mt-8 px-3.5 py-16 md:px-6 md:py-24"
        aria-labelledby="selected-work-title"
      >
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.14em] text-accent">
            Selected work
          </p>
          <h2 id="selected-work-title" className="h2 mt-3">
            Evidence from products I have built.
          </h2>
          <p className="mt-5 text-white/70">
            Aurex is the clearest example of my frontend, backend, security and
            workflow engineering working together in one system.
          </p>
        </header>

        <article className="mt-10 overflow-hidden rounded-2xl border border-accent/35 bg-surface/55">
          <div className="relative aspect-video w-full bg-primary md:aspect-[2.25/1]">
            <Image
              src={featuredProject.images[0]}
              alt="Aurex business operations dashboard"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>

          <div className="grid gap-9 p-5 md:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-bold md:text-4xl">
                  {featuredProject.title}
                </h3>
                <span className="rounded-full border border-accent/40 px-3 py-1 text-xs text-accent">
                  {featuredProject.status}
                </span>
              </div>
              <p className="mt-5 text-white/75">{featuredProject.summary}</p>

              <h4 className="mt-7 font-semibold text-white">
                What I implemented
              </h4>
              <p className="mt-2 text-sm text-white/70">
                {featuredProject.contribution}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {featuredProject.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label} <FiArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-primary/65 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">
                Key engineering evidence
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-white/75">
                {featuredProject.features.slice(0, 6).map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  Worker architecture
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {featuredProject.architecture}
                </p>
              </div>
              <p className="mt-5 border-l-2 border-accent pl-4 text-xs text-white/65">
                {featuredProject.note}
              </p>
            </div>
          </div>
        </article>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {supportingProjects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-surface/45"
            >
              <div className="relative aspect-video bg-primary">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} application interface`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className="text-xs text-accent">{project.status}</span>
                </div>
                <p className="mt-4 text-sm text-white/70">{project.summary}</p>
                <p className="mt-4 text-sm text-white/60">
                  <strong className="text-white/85">My contribution:</strong>{" "}
                  {project.contribution}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-white"
                    >
                      {link.label} <FiArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-white"
          >
            Read the full project case studies
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-surface/35 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-3.5 md:px-6 lg:grid-cols-2">
          <section aria-labelledby="experience-title">
            <p className="text-sm uppercase tracking-[0.14em] text-accent">
              Experience
            </p>
            <h2 id="experience-title" className="mt-3 text-3xl font-bold">
              Product work and industry training.
            </h2>
            <div className="mt-7 grid gap-6">
              {experienceItems.map((experience) => (
                <article
                  key={experience.company}
                  className="border-l-2 border-white/15 pl-5"
                >
                  <p className="text-sm text-accent">{experience.duration}</p>
                  <h3 className="mt-1 text-lg font-semibold">
                    {experience.position}
                  </h3>
                  <p className="text-sm text-white/60">{experience.company}</p>
                  <p className="mt-3 text-sm text-white/70">
                    {experience.responsibilities[0]}
                  </p>
                </article>
              ))}
            </div>
            <Link
              href="/resume"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white"
            >
              View full résumé <FiArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="toolkit-title">
            <p className="text-sm uppercase tracking-[0.14em] text-accent">
              Technical toolkit
            </p>
            <h2 id="toolkit-title" className="mt-3 text-3xl font-bold">
              Frontend depth with backend capability.
            </h2>
            <p className="mt-5 text-sm text-white/70">
              I work primarily in the TypeScript ecosystem, from responsive
              product interfaces through API, authorization and background-job
              implementation.
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/15 bg-primary/60 px-4 py-2 text-sm text-white/75"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-3.5 py-16 md:px-6 md:py-24">
        <div className="rounded-2xl border border-accent/30 bg-surface p-6 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.14em] text-accent">
            Available for opportunities
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Let&apos;s build something useful.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-white/70">
            I am open to frontend, frontend-heavy full-stack, junior backend and
            graduate software-engineering opportunities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href={siteConfig.emailHref}>
                <FiMail aria-hidden="true" /> Email Me
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">View Contact Details</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
