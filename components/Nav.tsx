import Link from "next/link";

const links = [
  { name: "Mindset", href: "#engineering-mindset" },
  { name: "Résumé", href: "#resume" },
  { name: "Work", href: "#selected-work" },
  { name: "Contact", href: "#contact" },
] as const;

export default function Nav() {
  return (
    <nav className="flex gap-5 lg:gap-8" aria-label="Primary navigation">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex min-h-6 items-center font-mono text-xs font-medium text-white/80 transition-colors hover:text-accent lg:text-sm"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
