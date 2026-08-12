import { siteConfig } from "@/lib/site-data";
import type { Metadata } from "next";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact David Okoye about frontend, full-stack TypeScript and graduate software-engineering opportunities.",
  alternates: { canonical: "/contact" },
};

const contactLinks = [
  { label: "Email", value: siteConfig.email, href: siteConfig.emailHref, icon: FiMail, external: false },
  { label: "LinkedIn", value: "okoyedavid7", href: siteConfig.linkedin, icon: FiLinkedin, external: true },
  { label: "GitHub", value: "okoyedavid", href: siteConfig.github, icon: FiGithub, external: true },
] as const;

export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-3.5 py-10 md:px-6 md:py-14">
      <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <section className="rounded-2xl bg-surface p-6 md:p-10" aria-labelledby="contact-title">
          <p className="text-sm uppercase tracking-[0.14em] text-accent">Contact</p>
          <h1 id="contact-title" className="h2 mt-3">Let&apos;s build something useful.</h1>
          <p className="mt-6 max-w-2xl text-white/70">I am open to frontend, frontend-heavy full-stack, junior backend and graduate software-engineering opportunities.</p>
          <p className="mt-5 text-sm text-white/60">Email is the most direct way to reach me. You can also review my work and professional profile through GitHub and LinkedIn.</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-white/65"><FiMapPin className="text-accent" aria-hidden="true" />{siteConfig.location}</div>
        </section>

        <ul className="grid gap-4">
          {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
            <li key={label}>
              <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-surface/55 p-5 transition-colors hover:border-accent/70">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-xl text-accent"><Icon aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm text-white/55">{label}</span><span className="block truncate text-base text-white md:text-lg">{value}</span></span>
                <FiArrowUpRight className="shrink-0 text-xl text-white/50 transition-colors group-hover:text-accent" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
