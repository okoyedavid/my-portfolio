import Link from "next/link";
import Nav from "./Nav";
import StaggeredMenu from "./StaggeredMenu";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white ">
      <div className="max-w-6xl mx-auto px-3.5 md:px-6 flex justify-between items-center">
        <Link href="/" className="hidden xl:block">
          <h1 className="text-4xl flex font-semibold">
            David <span className="text-accent">.</span>
          </h1>{" "}
        </Link>

        {/* Desktop Nav & hire me button  */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden">
          <StaggeredMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
