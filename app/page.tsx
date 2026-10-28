import ContactFooter from "@/components/home/ContactFooter";
import EngineeringMindset from "@/components/home/EngineeringMindset";
import HomeHero from "@/components/home/HomeHero";
import HomeResume from "@/components/home/HomeResume";
import SelectedWork from "@/components/home/SelectedWork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Okoye | Full Stack Developer",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <EngineeringMindset />
        <HomeResume />
        <SelectedWork />
      </main>
      <ContactFooter />
    </>
  );
}
