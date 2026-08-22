import Image from "next/image";
import Reveal from "./Reveal";

const capabilities = [
  "Full-stack SaaS products",
  "Authentication and session systems",
  "Multi-tenant permissions and RBAC",
  "REST APIs and backend services",
  "Background jobs, retries and failure handling",
  "Responsive product interfaces",
] as const;

export default function EngineeringMindset() {
  return (
    <section
      id="engineering-mindset"
      className="border-y border-white/10 bg-primary py-24 md:py-28 xl:py-32"
      aria-labelledby="engineering-mindset-title"
    >
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-x-24">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <p className="text-xs uppercase tracking-[0.14em] text-accent md:text-sm">
            Engineering mindset
          </p>
          <h2
            id="engineering-mindset-title"
            className="mt-3 text-3xl font-bold leading-[1.08] tracking-[-0.02em] md:text-4xl"
          >
            I think in systems.
          </h2>

          <div className="mt-7 max-w-[68ch] space-y-5 text-[0.98rem] leading-[1.75] text-white/68 md:text-base">
            <p>
              I&apos;ve always been drawn to the technical side of how things
              work &mdash; how systems are designed, where they fail, and what
              makes them dependable.
            </p>
            <p>
              Today, I build with React, Next.js, Node.js and TypeScript, but I
              see frameworks as tools rather than the destination. My long-term
              focus is engineering software that is secure, resilient and
              reliable under real-world use.
            </p>
            <p>
              I consider myself a software engineer first: someone interested
              not only in making products work, but in understanding the systems
              behind them and making those systems harder to break.
            </p>
            <p>
              If you&apos;re building a SaaS product, internal platform or
              growing startup, I can help turn requirements into dependable
              software &mdash; from the interface your users see to the
              authentication, permissions, APIs and background systems keeping
              it running.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="lg:col-start-1 lg:row-span-2 lg:row-start-1"
          delay={0.08}
          distance={22}
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2px] border border-white/10 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/engineering-mindset.jpg"
              alt=""
              fill
              quality={88}
              className="object-cover object-[48%_42%] lg:object-[47%_center]"
              sizes="(max-width: 1023px) calc(100vw - 40px), (max-width: 1279px) 40vw, 420px"
            />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-primary/45 to-transparent" />
          </div>
        </Reveal>

        <Reveal className="lg:col-start-2 lg:row-start-2" delay={0.12}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90">
            What I currently build
          </h3>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="flex gap-3 border-t border-white/10 py-3 text-sm leading-6 text-white/65"
              >
                <span className="text-accent" aria-hidden="true">
                  /
                </span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
