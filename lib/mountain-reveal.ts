/** The SVG landscape and canvas blueprint use the same 1200×800 coordinates. */
export const MOUNTAIN_REVEAL = {
  width: 1200,
  height: 800,
  centerX: 600,
  centerY: 480,
  maxRadius: Math.hypot(600, 480) + 56,
  photoStart: .58,
  photoEnd: .96,
  feather: 24,
} as const;

export const mountainEase = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function mountainRevealRadius(progress: number) {
  return MOUNTAIN_REVEAL.maxRadius * mountainEase(
    (progress - MOUNTAIN_REVEAL.photoStart) /
    (MOUNTAIN_REVEAL.photoEnd - MOUNTAIN_REVEAL.photoStart),
  );
}
