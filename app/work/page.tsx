import { projectItems } from "@/lib/site-data";
import type { Metadata } from "next";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected full-stack TypeScript projects by David Okoye, including Aurex, Animex and Aurela.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <main className="max-w-6xl mx-auto px-3.5 py-10 md:px-6 md:py-14">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.14em] text-accent">Selected work</p>
        <h1 className="h2 mt-3">Products, systems and engineering decisions.</h1>
        <p className="mt-5 text-white/70">A closer look at what I built, how each product works and where to inspect the applications and source.</p>
      </header>

      <div className="mt-12 space-y-16 md:space-y-24">
        {projectItems.map((project, projectIndex) => (
          <article key={project.title} className={projectIndex === 0 ? "rounded-2xl border border-accent/35 bg-surface/55 p-5 md:p-8" : "border-t border-white/15 pt-12"}>
            <div className="grid gap-9 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-extrabold text-transparent text-outline md:text-5xl" aria-hidden="true">{project.num}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-accent">{project.category}</p>
                    <p className="mt-1 text-sm text-white/65">Status: {project.status}</p>
                  </div>
                </div>
                <h2 className="mt-5 text-4xl font-bold md:text-5xl">{project.title}</h2>
                <p className="mt-5 text-white/75">{project.summary}</p>

                <section className="mt-7" aria-labelledby={`${project.title.toLowerCase()}-contribution`}>
                  <h3 id={`${project.title.toLowerCase()}-contribution`} className="text-lg font-semibold text-white">My contribution</h3>
                  <p className="mt-2 text-sm text-white/70">{project.contribution}</p>
                </section>

                <section className="mt-7" aria-labelledby={`${project.title.toLowerCase()}-features`}>
                  <h3 id={`${project.title.toLowerCase()}-features`} className="text-lg font-semibold">Implemented features</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-white/70">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{feature}</span></li>
                    ))}
                  </ul>
                </section>

                {project.architecture && (
                  <section className="mt-7 rounded-xl border border-white/10 bg-primary/70 p-5" aria-labelledby="aurex-architecture">
                    <p className="text-xs uppercase tracking-[0.14em] text-accent">Engineering decision</p>
                    <h3 id="aurex-architecture" className="mt-2 text-lg font-semibold">Durable work without an external queue</h3>
                    <p className="mt-2 text-sm text-white/70">{project.architecture}</p>
                  </section>
                )}

                {project.note && <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-white/75"><strong className="text-white">Scope note:</strong> {project.note}</p>}
              </div>

              <div className="min-w-0 xl:sticky xl:top-8">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {project.images.map((image, index) => (
                    <a key={image} href={image} target="_blank" rel="noopener noreferrer" className="group relative aspect-video overflow-hidden rounded-lg bg-surface" aria-label={`Open ${project.title} screenshot ${index + 1}`}>
                      <Image src={image} alt={`${project.title} interface screenshot ${index + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 26vw" />
                    </a>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.stack.map((technology) => <span key={technology} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{technology}</span>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <div key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-primary">
                        {link.label}<BsArrowUpRight aria-hidden="true" />
                      </a>
                      {"hint" in link && link.hint && <p className="mt-1 max-w-52 text-xs leading-relaxed text-white/55">{link.hint}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
