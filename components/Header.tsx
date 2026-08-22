import Link from "next/link";
import Nav from "./Nav";
import StaggeredMenu from "./StaggeredMenu";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white md:bg-gradient-to-b md:from-primary/95 md:to-transparent md:py-8 xl:py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="hidden rounded-sm md:block" aria-label="David Okoye, home">
          <span className="flex font-display text-4xl font-bold tracking-[-0.02em]">
            David <span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          <Nav />
        </div>

        <div className="md:hidden">
          <StaggeredMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
