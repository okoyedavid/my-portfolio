"use client";

import { siteConfig } from "@/lib/site-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import "./StaggeredMenu.css";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Résumé", href: "/resume" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="mobile-menu" data-open={open || undefined}>
      <div className="mobile-menu__layers" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="mobile-menu__bar">
        <Link href="/" className="rounded-sm text-3xl font-semibold" aria-label="David Okoye, home">David <span className="text-accent">.</span></Link>
        <button className="mobile-menu__toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          <span>{open ? "Close" : "Menu"}</span><span className="mobile-menu__icon" aria-hidden="true" />
        </button>
      </div>
      <div id="mobile-navigation" className="mobile-menu__panel" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile navigation">
          <ul className="grid gap-2">
            {menuItems.map((item, index) => (
              <li key={item.href} style={{ "--menu-index": index } as CSSProperties}><Link href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className="mobile-menu__link">{item.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <p className="text-sm text-accent">Professional links</p>
          <div className="mt-3 flex flex-wrap gap-5">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={siteConfig.emailHref}>Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}
