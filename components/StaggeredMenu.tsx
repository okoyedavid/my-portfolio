"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const pageRegions = document.querySelectorAll<HTMLElement>("main, footer");
    const previousOverflow = document.body.style.overflow;
    const focusFrame = requestAnimationFrame(() => {
      menu?.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus();
    });

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
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      pageRegions.forEach((region) => {
        region.inert = false;
      });
      toggle?.focus();
    };
  }, [closeMenu, open]);

  return (
    <div
      ref={menuRef}
      className="mobile-menu"
      data-open={open || undefined}
    >
      <div className="mobile-menu__bar">
        <Link href="/" className="mobile-menu__logo" aria-label="David Okoye, home">
          David<span>.</span>
        </Link>
        <button
          ref={toggleRef}
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
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
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
