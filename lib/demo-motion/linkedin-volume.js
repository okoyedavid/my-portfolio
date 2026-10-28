/** A small, extruded vector "in" glyph, sampled as distance + gradient RGBA. */
export function generateLinkedInVolume(size = 64) {
  const box = (x, y, hx, hy) => {
    const a = Math.abs(x) - hx,
      b = Math.abs(y) - hy;
    return (
      Math.hypot(Math.max(a, 0), Math.max(b, 0)) + Math.min(Math.max(a, b), 0)
    );
  };
  const ellipse = (x, y, rx, ry) =>
    (Math.hypot(x / rx, y / ry) - 1) * Math.min(rx, ry);
  function distance(x, y, z) {
    const stemI = box(x + 0.265, y + 0.065, 0.065, 0.205);
    const dotI = Math.hypot(x + 0.265, y - 0.28) - 0.075;
    const stemN = box(x + 0.06, y + 0.045, 0.067, 0.225);
    const arch = Math.max(
      ellipse(x - 0.095, y - 0.035, 0.225, 0.215),
      -ellipse(x - 0.095, y - 0.035, 0.095, 0.09),
      0.035 - y,
    );
    const rightN = box(x - 0.25, y + 0.1, 0.067, 0.17);
    const glyph = Math.min(stemI, dotI, stemN, arch, rightN);
    const depth = Math.abs(z) - 0.075;
    return (
      Math.min(Math.max(glyph, depth), 0) +
      Math.hypot(Math.max(glyph, 0), Math.max(depth, 0)) -
      0.008
    );
  }
  const data = new Uint8Array(size * size * size * 4),
    epsilon = 1 / size;
  const byte = (x) => Math.round(Math.max(0, Math.min(1, x)) * 255);
  for (let k = 0; k < size; k++)
    for (let j = 0; j < size; j++)
      for (let i = 0; i < size; i++) {
        const x = (i + 0.5) / size - 0.5,
          y = (j + 0.5) / size - 0.5,
          z = (k + 0.5) / size - 0.5;
        const dx = distance(x + epsilon, y, z) - distance(x - epsilon, y, z),
          dy = distance(x, y + epsilon, z) - distance(x, y - epsilon, z),
          dz = distance(x, y, z + epsilon) - distance(x, y, z - epsilon);
        const length = Math.hypot(dx, dy, dz) || 1,
          o = ((k * size + j) * size + i) * 4;
        data[o] = byte((dx / length) * 0.5 + 0.5);
        data[o + 1] = byte((dy / length) * 0.5 + 0.5);
        data[o + 2] = byte((dz / length) * 0.5 + 0.5);
        // The original shader decodes alpha with (a * 2 - 1) * 2.
        data[o + 3] = byte(distance(x, y, z) / 4 + 0.5);
      }
  return data;
}
