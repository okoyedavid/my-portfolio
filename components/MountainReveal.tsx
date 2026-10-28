"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { MotionValue } from "framer-motion";
import {
  MOUNTAIN_REVEAL as reveal,
  mountainEase as smooth,
  mountainRevealRadius,
} from "@/lib/mountain-reveal";
import styles from "./ScrollParallaxScene.module.css";

type Particle = {
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  delay: number;
  seed: number;
};
type Mesh = {
  particles: Particle[];
  edges: [number, number][];
  silhouette: HTMLCanvasElement | null;
};
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const noise = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** The clipping silhouette and mesh are sampled from the photos at their exact initial offsets. */
function createMountainMesh(images: HTMLImageElement[], step: number): Mesh {
  const sample = document.createElement("canvas");
  sample.width = 600;
  sample.height = 400;
  const context = sample.getContext("2d", { willReadFrequently: true });
  if (!context) return { particles: [], edges: [], silhouette: null };
  [-10, -30, -50].forEach((y, i) =>
    context.drawImage(images[i], 0, y / 2, 600, 400),
  );
  const data = context.getImageData(0, 0, 600, 400).data;
  const columns = Math.ceil(1200 / step) + 1,
    rows = Math.ceil(800 / step) + 1;
  const grid = new Int32Array(columns * rows).fill(-1);
  const particles: Particle[] = [],
    edges: [number, number][] = [];
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < columns; col++) {
      const id = row * columns + col;
      const x = Math.min(
        1198,
        Math.max(1, col * step + (noise(id + 3) - 0.5) * step * 0.45),
      );
      const y = Math.min(
        798,
        Math.max(1, row * step + (noise(id + 7) - 0.5) * step * 0.45),
      );
      const pixel = (Math.floor(y / 2) * 600 + Math.floor(x / 2)) * 4;
      if (data[pixel + 3] < 60) continue;
      const seed = noise(id + 11);
      grid[id] = particles.length;
      const distance =
        Math.hypot(x - reveal.centerX, y - reveal.centerY) / reveal.maxRadius;
      particles.push({
        x,
        y,
        fromX: x + (noise(id + 17) - 0.5) * 24,
        fromY: y + (noise(id + 23) - 0.5) * 24,
        delay: distance * 0.3 + seed * 0.035,
        seed,
      });
    }
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < columns; col++) {
      const id = row * columns + col,
        a = grid[id];
      if (a < 0) continue;
      const neighbors = [
        col + 1 < columns ? id + 1 : -1,
        row + 1 < rows ? id + columns : -1,
        row + 1 < rows && col + 1 < columns ? id + columns + 1 : -1,
      ];
      for (const neighbor of neighbors)
        if (neighbor >= 0 && grid[neighbor] >= 0)
          edges.push([a, grid[neighbor]]);
    }
  return { particles, edges, silhouette: sample };
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${source}`));
    image.src = source;
  });
}

export default function MountainReveal({
  progress,
  revealCircle,
  onComplete,
}: {
  progress: MotionValue<number>;
  revealCircle: RefObject<SVGCircleElement | null>;
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    let cancelled = false,
      completed = false,
      frame = 0;
    const finish = () => {
      if (cancelled || completed) return;
      completed = true;
      cancelAnimationFrame(frame);
      revealCircle.current?.setAttribute("r", String(reveal.maxRadius));
      progress.set(1);
      onComplete();
    };
    skipRef.current = finish;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferenceChanged = () => {
      if (motion.matches) finish();
    };
    motion.addEventListener("change", preferenceChanged);
    if (motion.matches) {
      finish();
      return () => {
        cancelled = true;
        motion.removeEventListener("change", preferenceChanged);
      };
    }
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      finish();
      return () => {
        cancelled = true;
        motion.removeEventListener("change", preferenceChanged);
      };
    }
    let width = 1,
      height = 1,
      dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const sources = [
      "mountBg.webp",
      "mountMg.webp",
      "mountFg.webp",
      "sky.webp",
      "cloud1.png",
      "cloud2.webp",
      "cloud3.png",
      "cloud1Mask.jpg",
    ];
    const ready = Promise.all(
      sources.map((source) => loadImage(`/scroll-effect/${source}`)),
    );
    const font = document.fonts
      .load(
        '900 32px "MountainDemoMontserrat"',
        "Hi there, My name is David Okoye",
      )
      .catch(() => []);
    Promise.all([ready, font])
      .then(([images]) => {
        if (cancelled || completed) return;
        const mesh = createMountainMesh(
          images.slice(0, 3),
          width < 640 ? 32 : 25,
        );
        const layer = document.createElement("canvas");
        layer.width = 1200;
        layer.height = 800;
        const wire = layer.getContext("2d");
        if (!wire) {
          finish();
          return;
        }
        const positions = new Float32Array(mesh.particles.length * 2),
          assembled = new Float32Array(mesh.particles.length);
        const began = performance.now() + 800;
        const draw = (now: number) => {
          if (cancelled || completed) return;
          const p = clamp((now - began) / 4000);
          const radius = mountainRevealRadius(p);
          // Update the actual SVG clip and the canvas opening in this same frame.
          // No photograph is visible during the blueprint stage.
          revealCircle.current?.setAttribute("r", String(radius));
          progress.set(p);
          canvas.dataset.phase =
            p < 0.18
              ? "particles"
              : p < reveal.photoStart
                ? "wireframe"
                : "reveal";
          canvas.dataset.progress = p.toFixed(3);
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.globalCompositeOperation = "source-over";
          context.globalAlpha = 1;
          context.clearRect(0, 0, width, height);
          context.fillStyle = "#102438";
          context.fillRect(0, 0, width, height);
          const scale = Math.max(width / 1200, height / 800);
          context.setTransform(
            dpr * scale,
            0,
            0,
            dpr * scale,
            (dpr * (width - 1200 * scale)) / 2,
            (dpr * (height - 800 * scale)) / 2,
          );
          mesh.particles.forEach((point, index) => {
            const t = smooth((p - point.delay) / 0.18);
            assembled[index] = t;
            positions[index * 2] = point.fromX + (point.x - point.fromX) * t;
            positions[index * 2 + 1] =
              point.fromY + (point.y - point.fromY) * t;
          });
          wire.clearRect(0, 0, 1200, 800);
          wire.globalCompositeOperation = "source-over";
          wire.globalAlpha = 0.64;
          wire.strokeStyle = "#bce6ff";
          wire.lineWidth = 0.8;
          wire.beginPath();
          for (const [a, b] of mesh.edges) {
            if (Math.min(assembled[a], assembled[b]) < 0.75) continue;
            wire.moveTo(positions[a * 2], positions[a * 2 + 1]);
            wire.lineTo(positions[b * 2], positions[b * 2 + 1]);
          }
          wire.stroke();
          wire.globalAlpha = 0.9;
          wire.fillStyle = "#e8f7ff";
          wire.beginPath();
          mesh.particles.forEach((point, index) => {
            if (assembled[index] < 0.08) return;
            const r = 0.65 + point.seed * 0.55;
            wire.moveTo(positions[index * 2] + r, positions[index * 2 + 1]);
            wire.arc(
              positions[index * 2],
              positions[index * 2 + 1],
              r,
              0,
              Math.PI * 2,
            );
          });
          wire.fill();
          wire.globalAlpha = 1;
          // Trim crossing edges to the real photo silhouette, including its soft alpha edge.
          if (mesh.silhouette) {
            wire.globalCompositeOperation = "destination-in";
            wire.drawImage(mesh.silhouette, 0, 0, 1200, 800);
            wire.globalCompositeOperation = "source-over";
          }
          context.drawImage(layer, 0, 0);
          if (radius > 0) {
            const inner = Math.max(0, radius - reveal.feather);
            const hole = context.createRadialGradient(
              reveal.centerX,
              reveal.centerY,
              inner,
              reveal.centerX,
              reveal.centerY,
              radius,
            );
            hole.addColorStop(0, "rgba(0,0,0,1)");
            hole.addColorStop(1, "rgba(0,0,0,0)");
            context.globalCompositeOperation = "destination-out";
            context.fillStyle = hole;
            context.beginPath();
            context.arc(reveal.centerX, reveal.centerY, radius, 0, Math.PI * 2);
            context.fill();
            context.globalCompositeOperation = "source-over";
            if (radius > 12 && p < 0.95) {
              context.globalAlpha = 0.2;
              context.strokeStyle = "#c8edff";
              context.lineWidth = 1;
              context.beginPath();
              context.arc(
                reveal.centerX,
                reveal.centerY,
                radius - 8,
                0,
                Math.PI * 2,
              );
              context.stroke();
              context.globalAlpha = 1;
            }
          }
          if (p >= 1) finish();
          else frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
      })
      .catch(() => finish());
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", preferenceChanged);
      skipRef.current = () => {};
    };
  }, [progress, revealCircle, onComplete]);

  return (
    <div className={styles.mountainIntro} data-mountain-reveal="true">
      <canvas
        ref={canvasRef}
        className={styles.revealCanvas}
        aria-hidden="true"
      />
      <p className={styles.introCaption} role="status">
        Forming the landscape
      </p>
      <button
        type="button"
        className={styles.skipIntro}
        onClick={() => skipRef.current()}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
