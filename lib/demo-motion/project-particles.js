/** Project wordmarks use the original social-icon GPU simulation, with new SDF volumes. */
export async function createProjectParticles(E, scene, getPresentation) {
  const { DA, Fe, q } = E;
  const particles = scene.containerparticles;
  const mesh = particles.mesh;
  const u = mesh.computationMaterial.uniforms;
  const material = mesh.material.uniforms;
  const customVolumes = [];
  const anchor = mesh.position.clone();
  const direction = mesh.position.clone();
  // Original social-link UI owns global arrow/touch listeners. Keep it inactive;
  // the accessible React controls below own project selection instead.
  particles.UI.disable();
  particles.UI.update = () => {};
  particles.UI.group.removeFromParent();
  await document.fonts.ready;
  const family =
    getComputedStyle(document.body)
      .getPropertyValue("--font-bricolage-grotesque")
      .trim() || "Arial";
  const template = particles.vdbs[0];
  for (const word of ["Aurex", "AureScore", "Aurela"]) {
    const volume = new DA(wordVolume(word, family, 128), 128, 128, 128);
    for (const key of ["minFilter", "magFilter", "wrapS", "wrapT", "wrapR"])
      volume[key] = template[key];
    volume.needsUpdate = true;
    customVolumes.push(volume);
  }
  let selected = -1,
    changedAt = 0,
    entered = false;
  const present = () => {
    const state = getPresentation?.() || {};
    const camera = Math.max(0, Math.min(1, state.camera || 0));
    const visible = camera > 0.88;
    const next = Math.max(0, Math.min(2, state.projectIndex || 0));
    if (next !== selected || (visible && !entered)) {
      selected = next;
      changedAt = Fe.time;
      scene.floor.additionalTime += 2;
    }
    entered = visible;
    const age = state.reducedMotion ? 10 : Math.max(0, Fe.time - changedAt);
    u.tVolume.value = customVolumes[selected];
    u.uVolumeScale.value = 1;
    u.uRotation.value =
      Math.PI + (state.reducedMotion ? 0 : Math.sin(Fe.time * 0.28) * 0.06);
    u.uShowNoise.value = Math.max(0, 1 - age / 1.35);
    u.uAdditionalNoise.value = Math.pow(Math.max(0, 1 - age / 0.7), 2);
    u.uInteractForce.value = 0;
    material.uVisible.value = 1;
    material.uAlpha.value = state.opened
      ? 0
      : Math.min(1, Math.max(0, (camera - 0.88) / 0.12)) *
        Math.min(1, Math.max(0, (age - 0.25) / 0.9));
    material.uInitialGlow.value = Math.max(0, 1 - age / 1);
    mesh.visible = visible && !state.opened && !state.reducedMotion;
    // Align the word to screen center, independently of camera sway/aspect ratio.
    // Project the desired screen anchor back onto the native particle plane.
    anchor.set(0, 0.1, 0.5).unproject(scene.camera);
    direction.copy(anchor).sub(scene.camera.position);
    const distance = -scene.camera.position.z / direction.z;
    mesh.position
      .copy(scene.camera.position)
      .addScaledVector(direction, distance);
    const worldHeight =
      (2 *
        Math.tan((scene.camera.fov * Math.PI) / 360) *
        Math.abs(scene.camera.position.z)) /
      scene.camera.zoom;
    const desiredWidth = Math.min(620, q.screen.width * 0.66);
    const scale =
      (worldHeight * q.screen.aspectRatio * desiredWidth) /
      q.screen.width /
      0.56;
    mesh.scale.setScalar(scale);
    mesh.updateMatrixWorld();
    scene.textcylinder.mesh.visible = false;
    scene.textcylinder.mesh2.visible = false;
  };
  // UF updates its camera and material timeline first; override only the new
  // project presentation, leaving the native floor, lighting and compositor.
  scene.beforeRenderCbs.push(present);
  return {
    dispose() {
      const index = scene.beforeRenderCbs.indexOf(present);
      if (index !== -1) scene.beforeRenderCbs.splice(index, 1);
      for (const volume of customVolumes) volume.dispose();
    },
  };
}

/** Extruded text -> signed distance + normalized gradient, in the engine's RGBA format. */
function wordVolume(word, family, size) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("The project wordmarks could not be prepared.");
  ctx.font = `800 64px ${family}`;
  const fontSize = Math.min(
    46,
    (64 * (size * 0.86)) / ctx.measureText(word).width,
  );
  ctx.font = `800 ${fontSize}px ${family}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "white";
  const metrics = ctx.measureText(word);
  ctx.fillText(
    word,
    (size - metrics.actualBoundingBoxLeft - metrics.actualBoundingBoxRight) /
      2 +
      metrics.actualBoundingBoxLeft,
    (size +
      metrics.actualBoundingBoxAscent -
      metrics.actualBoundingBoxDescent) /
      2,
  );
  const pixels = ctx.getImageData(0, 0, size, size).data;
  const inside = new Uint8Array(size * size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      inside[y * size + x] =
        pixels[((size - 1 - y) * size + x) * 4 + 3] > 100 ? 1 : 0;
    }
  const toInside = distanceField(inside, size, 1);
  const toOutside = distanceField(inside, size, 0);
  const field = new Float32Array(size ** 3);
  for (let z = 0; z < size; z++) {
    const depth = Math.abs((z + 0.5) / size - 0.5) - 0.035;
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        const distance = (inside[i] ? -toOutside[i] : toInside[i]) / size;
        field[(z * size + y) * size + x] =
          Math.min(Math.max(distance, depth), 0) +
          Math.hypot(Math.max(distance, 0), Math.max(depth, 0));
      }
  }
  const data = new Uint8Array(size ** 3 * 4);
  const byte = (n) => Math.round(Math.min(1, Math.max(0, n)) * 255);
  for (let z = 0; z < size; z++)
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        const i = (z * size + y) * size + x;
        const dx =
          field[i + (x < size - 1 ? 1 : 0)] - field[i - (x > 0 ? 1 : 0)];
        const dy =
          field[i + (y < size - 1 ? size : 0)] - field[i - (y > 0 ? size : 0)];
        const dz =
          field[i + (z < size - 1 ? size * size : 0)] -
          field[i - (z > 0 ? size * size : 0)];
        const len = Math.hypot(dx, dy, dz) || 1;
        data[i * 4] = byte((dx / len) * 0.5 + 0.5);
        data[i * 4 + 1] = byte((dy / len) * 0.5 + 0.5);
        data[i * 4 + 2] = byte((dz / len) * 0.5 + 0.5);
        data[i * 4 + 3] = byte(field[i] / 4 + 0.5);
      }
  return data;
}

function distanceField(mask, size, target) {
  const d = new Float32Array(size * size);
  for (let i = 0; i < d.length; i++) d[i] = mask[i] === target ? 0 : size * 2;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      if (x) d[i] = Math.min(d[i], d[i - 1] + 1);
      if (y) d[i] = Math.min(d[i], d[i - size] + 1);
      if (x && y) d[i] = Math.min(d[i], d[i - size - 1] + Math.SQRT2);
      if (x < size - 1 && y)
        d[i] = Math.min(d[i], d[i - size + 1] + Math.SQRT2);
    }
  for (let y = size - 1; y >= 0; y--)
    for (let x = size - 1; x >= 0; x--) {
      const i = y * size + x;
      if (x < size - 1) d[i] = Math.min(d[i], d[i + 1] + 1);
      if (y < size - 1) d[i] = Math.min(d[i], d[i + size] + 1);
      if (x < size - 1 && y < size - 1)
        d[i] = Math.min(d[i], d[i + size + 1] + Math.SQRT2);
      if (x && y < size - 1)
        d[i] = Math.min(d[i], d[i + size - 1] + Math.SQRT2);
    }
  return d;
}
