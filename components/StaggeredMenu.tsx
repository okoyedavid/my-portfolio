"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import "./StaggeredMenu.css";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Mindset", href: "#engineering-mindset" },
  { label: "Résumé", href: "#resume" },
  { label: "Work", href: "#selected-work" },
  { label: "Contact", href: "#contact" },
] as const;

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-menu" data-open={open || undefined}>
      <div className="mobile-menu__layers" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="mobile-menu__bar">
        <Link href="/" className="mobile-menu__logo" aria-label="David Okoye, home">
          David<span>.</span>
        </Link>
        <button
          className="mobile-menu__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="mobile-menu__icon" aria-hidden="true" />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-menu__panel"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="grid gap-2">
          {menuItems.map((item, index) => (
            <li
              key={item.href}
              style={{ "--menu-index": index } as CSSProperties}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="mobile-menu__link"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
