import { Button } from "@/components/ui/button";
import { educationItems, experienceItems, siteConfig, skills } from "@/lib/site-data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Experience, education and technical skills for David Okoye, a frontend-heavy full-stack TypeScript developer.",
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return (
    <main className="max-w-6xl mx-auto px-3.5 py-10 md:px-6 md:py-14">
      <header className="grid gap-7 border-b border-white/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.14em] text-accent">Résumé</p>
          <h1 className="h2 mt-3">Experience and technical foundation.</h1>
          <p className="mt-5 text-white/70">{siteConfig.summary}</p>
        </div>
        <Button asChild variant="outline" size="lg"><Link href="/contact">Contact Me</Link></Button>
      </header>

      <section className="py-12" aria-labelledby="experience-title">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="text-sm text-accent">01 / Background</p>
            <h2 id="experience-title" className="mt-2 text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experienceItems.map((item) => (
              <article key={item.company} className="rounded-xl bg-surface/70 p-5 md:p-7">
                <p className="text-sm text-accent">{item.duration}</p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">{item.position}</h3>
                <p className="mt-1 text-white/60">{item.company}</p>
                <ul className="mt-5 grid gap-2 text-sm text-white/70">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{responsibility}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/15 py-12" aria-labelledby="education-title">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="text-sm text-accent">02 / Foundation</p>
            <h2 id="education-title" className="mt-2 text-3xl font-bold">Education</h2>
          </div>
          <div>
            {educationItems.map((item) => (
              <article key={item.institution} className="rounded-xl bg-surface/70 p-5 md:p-7">
                <p className="text-sm text-accent">{item.duration}</p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">{item.degree}</h3>
                <p className="mt-1 text-white/60">{item.institution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/15 py-12" aria-labelledby="skills-title">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="text-sm text-accent">03 / Toolkit</p>
            <h2 id="skills-title" className="mt-2 text-3xl font-bold">Core skills</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3">
            {skills.map((skill) => <li key={skill} className="rounded-full border border-white/15 bg-surface/60 px-4 py-2 text-sm text-white/80">{skill}</li>)}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/15 py-10 text-center" aria-labelledby="resume-contact-title">
        <h2 id="resume-contact-title" className="text-2xl font-semibold">Interested in working together?</h2>
        <p className="mt-3 text-white/65">See the engineering evidence in my selected work, or get in touch directly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/work">View Selected Work</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Contact Me</Link></Button>
        </div>
      </section>
    </main>
  );
}
