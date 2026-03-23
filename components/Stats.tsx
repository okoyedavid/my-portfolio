"use client";

import CountUp from "react-countup";
import { stats } from "@/lib/site-data";

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="max-w-6xl mx-auto px-3.5 md:px-6">
        <div className="flex flex-wrap gap-6 mx-auto xl:max-w-none ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-1 flex gap-1 items-center justify-center xl:justify-start"
            >
              <CountUp
                end={stat.num}
                duration={5}
                delay={2}
                className="text-xl sm:text-3xl md:text-4xl xl:text-6xl font-extrabold"
              />
              <span className="text-xl sm:text-3xl md:text-4xl xl:text-6xl font-extrabold">
                {stat.suffix ?? ""}
              </span>
              <p
                className={`${stat.text.length < 15 ? "max-w-full md:max-w-25" : "max-w-full md:max-w-37.5"} leading-snug text-white/80`}
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
