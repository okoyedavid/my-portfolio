"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Mindset", href: "#engineering-mindset" },
  { label: "Résumé", href: "#resume" },
  { label: "Work", href: "#selected-work" },
  { label: "Contact", href: "#contact" },
] as const;

const SLIDE_DURATION = 520;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const pageRegions = document.querySelectorAll<HTMLElement>("main, footer");
    const previousOverflow = document.body.style.overflow;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const focusTimer = window.setTimeout(
      () => {
        menu
          ?.querySelector<HTMLAnchorElement>("#mobile-navigation a")
          ?.focus({ preventScroll: true });
      },
      reduceMotion ? 0 : SLIDE_DURATION,
    );

    document.body.style.overflow = "hidden";
    pageRegions.forEach((region) => {
      region.inert = true;
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menu) return;

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.closest("[inert]"));
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      pageRegions.forEach((region) => {
        region.inert = false;
      });
      toggle?.focus({ preventScroll: true });
    };
  }, [closeMenu, open]);

  return (
    <div
      ref={menuRef}
      className={`pointer-events-none fixed inset-0 z-40 h-dvh overflow-hidden ${
        open ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="pointer-events-auto relative z-20 flex h-20 items-center justify-between bg-primary px-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="inline-flex min-h-11 items-center rounded-sm font-display text-3xl font-bold leading-none tracking-[-0.02em] text-white"
          aria-label="David Okoye, home"
        >
          David<span className="text-accent">.</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-24 items-center justify-end gap-2 bg-transparent font-mono text-xs uppercase tracking-[0.08em] text-white"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="inline-block w-12 text-right">
            {open ? "Close" : "Menu"}
          </span>
          <span
            className={`relative block size-4 shrink-0 transition-transform duration-500 ease-out motion-reduce:duration-0 ${
              open ? "rotate-[135deg]" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-accent" />
            <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-accent" />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`absolute inset-0 z-10 flex will-change-transform flex-col justify-center bg-primary px-5 pb-8 pt-24 transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${
          open
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="grid gap-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className="inline-block font-display text-[clamp(2.2rem,11vw,3.75rem)] font-bold uppercase leading-[1.15] text-white transition-colors hover:text-accent"
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
