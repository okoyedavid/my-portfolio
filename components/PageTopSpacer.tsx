"use client";
import { usePathname } from "next/navigation";

/** The immersive demo has no fixed header, so it needs no reserved header space. */
export default function PageTopSpacer() {
  return usePathname() === "/demo" ? null : (
    <div className="h-20 md:h-[6.25rem] xl:h-[7.25rem]" aria-hidden="true" />
  );
}
