"use client";

import CountUp from "react-countup";
import { stats } from "@/lib/site-data";

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-20 mx-auto xl:max-w-none ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-1 flex gap-1 items-center justify-center xl:justify-start"
            >
              <CountUp
                end={stat.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <span className="text-4xl xl:text-6xl font-extrabold">
                {stat.suffix ?? ""}
              </span>
              <p
                className={`${stat.text.length < 15 ? "max-w-25" : "max-w-37.5"} leading-snug text-white/80`}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
