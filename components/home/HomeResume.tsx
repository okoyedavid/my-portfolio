import { educationItems, experienceItems } from "@/lib/site-data";
import { FiDownload } from "react-icons/fi";
import { Button } from "../ui/button";
import Reveal from "./Reveal";

export default function HomeResume() {
  return (
    <section
      id="resume"
      className="scroll-mt-24 border-b border-white/10 bg-surface/25 py-20 md:scroll-mt-28 md:py-24 xl:py-28"
      aria-labelledby="resume-title"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <header className="grid gap-7 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.14em] text-accent md:text-sm">
                R&eacute;sum&eacute;
              </p>
              <h2 id="resume-title" className="mt-3 text-3xl font-bold md:text-4xl">
                Experience and education.
              </h2>
            </div>
            <Button asChild size="lg" variant="outline">
              <a href="/Resume.pdf" download>
                Download r&eacute;sum&eacute; <FiDownload aria-hidden="true" />
              </a>
            </Button>
          </header>
        </Reveal>

        <div className="grid gap-16 pt-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal delay={0.06}>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                01 / Experience
              </h3>
              <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
                {experienceItems.map((item) => (
                  <article key={item.company} className="py-7 first:pt-6">
                    <p className="font-mono text-xs text-accent">{item.duration}</p>
                    <h4 className="mt-2 text-xl font-semibold md:text-2xl">
                      {item.position}
                    </h4>
                    <p className="mt-1 text-sm text-white/45">{item.company}</p>
                    <ul className="mt-5 grid max-w-[68ch] gap-2.5 text-sm leading-[1.65] text-white/65">
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex gap-3">
                          <span className="font-mono text-accent" aria-hidden="true">
                            /
                          </span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                02 / Education
              </h3>
              <div className="mt-6 border-t border-white/10">
                {educationItems.map((item) => (
                  <article key={item.institution} className="py-6">
                    <p className="font-mono text-xs text-accent">{item.duration}</p>
                    <h4 className="mt-2 text-xl font-semibold">{item.degree}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-white/45">
                      {item.institution}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
