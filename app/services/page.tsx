import { serviceItems } from "@/lib/site-data";
import type { Metadata } from "next";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Engineering Capabilities",
  description: "Frontend and full-stack TypeScript capabilities spanning SaaS dashboards, authentication, RBAC, APIs and background workflows.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <main className="max-w-6xl mx-auto px-3.5 py-10 md:px-6 md:py-14">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.14em] text-accent">Engineering capabilities</p>
        <h1 className="h2 mt-3">How I contribute to product teams.</h1>
        <p className="mt-5 text-white/70">Concrete frontend and TypeScript capabilities I can bring to an engineering role.</p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {serviceItems.map((service) => (
          <article key={service.num} className="group border-b border-white/15 pb-8">
            <div className="flex items-start justify-between gap-5">
              <span className="text-4xl font-extrabold text-transparent text-outline" aria-hidden="true">{service.num}</span>
              <Link href="/contact" aria-label={`Contact David about ${service.title}`} className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-accent">
                <BsArrowDownRight className="text-2xl" aria-hidden="true" />
              </Link>
            </div>
            <h2 className="mt-5 text-2xl font-bold leading-tight transition-colors group-hover:text-accent md:text-3xl">{service.title}</h2>
            <p className="mt-4 text-white/70">{service.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
