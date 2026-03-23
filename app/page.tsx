import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-data";

const Home = () => {
  return (
    <section className="h-full">
      <div className="max-w-6xl mx-auto px-3.5 md:px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="order-2 xl:order-0 text-center xl:text-left">
            <span className="text-sm md:text-xl text-accent">
              {siteConfig.role}
            </span>
            <h1 className="h1 mt-4">
              Building
              <br />
              <span className="text-accent">products that ship</span>
            </h1>

            <div className="flex flex-col mt-6 xl:flex-row items-center gap-8">
              <Link href={siteConfig.resume} target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download Resume</span>
                  <FiDownload className="text-xl" />
                </Button>
              </Link>

              <Link href="/work">
                <Button size="lg" className="uppercase">
                  View Selected Work
                </Button>
              </Link>

              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="order-1 xl:order-0 mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
