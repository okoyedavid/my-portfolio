import { siteConfig } from "@/lib/site-data";
import { FiArrowUp, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Reveal from "./Reveal";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-white/10 bg-primary px-5 pb-8 pt-20 md:scroll-mt-24 md:px-8 md:pt-28"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.14em] text-accent md:text-sm">
            Contact
          </p>
          <div className="mt-4 grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h2
                id="contact-title"
                className="max-w-3xl text-4xl font-bold leading-[1.03] tracking-[-0.03em] sm:text-5xl md:text-6xl"
              >
                Let&apos;s build something dependable.
              </h2>
              <a
                href={siteConfig.emailHref}
                className="mt-8 inline-flex items-center gap-3 text-lg text-accent transition-colors hover:text-white md:text-xl"
              >
                <FiMail aria-hidden="true" /> {siteConfig.email}
              </a>
            </div>

            <address className="space-y-5 not-italic lg:justify-self-end">
              <p className="max-w-sm text-sm leading-[1.7] text-white/55">
                Open to frontend, full-stack TypeScript and graduate
                software-engineering opportunities.
              </p>
              <p className="font-mono text-xs text-white/60">{siteConfig.location}</p>
              <div className="flex flex-wrap gap-5 text-sm">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-accent"
                >
                  <FiGithub aria-hidden="true" /> GitHub
                  <FiArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-accent"
                >
                  <FiLinkedin aria-hidden="true" /> LinkedIn
                  <FiArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className="text-white/60 transition-colors hover:text-accent"
                >
                  R&eacute;sum&eacute; PDF
                </a>
              </div>
            </address>
          </div>
        </Reveal>

        <div className="flex flex-col gap-2 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/55 sm:flex-row sm:justify-between">
          <span>&copy; 2026 David Okoye</span>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
