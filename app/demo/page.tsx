import type { Metadata } from "next";
import ScrollParallaxScene from "@/components/ScrollParallaxScene";

export const metadata: Metadata = {
  title: "Hi there - David Okoye",
  description:
    "Meet David Okoye, a software engineer, then travel through ice rings and explore the websites he builds.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <main id="main-content">
      <ScrollParallaxScene />
    </main>
  );
}
