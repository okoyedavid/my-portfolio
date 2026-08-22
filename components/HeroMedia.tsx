"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroMedia() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const loadVideoAfterPoster = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVideoEnabled(true);
    }
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <div className="absolute right-[-10%] top-1/2 aspect-square w-[min(110vw,860px)] -translate-y-1/2 sm:right-[-4%] sm:w-[min(88vw,860px)] xl:right-[3vw] xl:w-[min(62vw,860px)]">
        <Image
          src="/home/bg-image.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 639px) 110vw, (max-width: 1279px) 88vw, 62vw"
          className="object-contain"
          onLoad={loadVideoAfterPoster}
        />

        {videoEnabled && (
          <video
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            src="/home/bg-video-optimized.mp4"
            poster="/home/bg-image.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-primary to-transparent" />
    </div>
  );
}
