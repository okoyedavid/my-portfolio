import { generateLinkedInVolume } from "./linkedin-volume";
import { createProjectParticles } from "./project-particles";
import { applyPortfolioPalette } from "./portfolio-palette";

// The delivered engine is a vendor module. React owns mounting, scroll and UI.
// Queue mounts because the original renderer has one WebGL/global event context.
let queue = Promise.resolve();
let generation = 0;
const clamp = (n) => Math.max(0, Math.min(1, n));
const shapes = [
  { name: "X", volume: 1 },
  { name: "Medium", volume: 2 },
  { name: "LinkedIn", volume: 3 },
];
const shapeAt = (time) => {
  const index = Math.min(2, Math.floor(time / 4));
  return { ...shapes[index], index, local: time - index * 4 };
};

export function mountOriginalMotion({
  host,
  kind,
  assetPrefix = "",
  getProgress,
  getPresentation,
  onFrame,
}) {
  let cancelled = false,
    instance = null;
  const ready = queue
    .catch(() => {})
    .then(async () => {
      if (cancelled) return null;
      const url =
        assetPrefix +
        "/assets/original-renderer.js?mount=" +
        Date.now() +
        "-" +
        ++generation;
      const E = await import(
        /* webpackIgnore: true */ /* turbopackIgnore: true */ url
      );
      if (cancelled) {
        E.q.dispose();
        E.re.ticker.sleep();
        return null;
      }
      instance = await createScene(E, {
        host,
        kind,
        assetPrefix,
        getProgress,
        getPresentation,
        onFrame,
      });
      if (cancelled) {
        instance.dispose();
        return null;
      }
      return instance;
    });
  queue = ready.then(
    () => {},
    () => {},
  );
  return {
    ready,
    dispose() {
      cancelled = true;
      instance?.dispose();
    },
  };
}

async function createScene(
  E,
  { host, kind, assetPrefix, getProgress, getPresentation, onFrame },
) {
  const { he, jF, F3, UF, tA, Jo, Q, re, Ei, q, _i, Je, ly, DA } = E;
  E.setStudyClock(null);
  re.ticker.wake();
  const eases = {
    inOut5: "M0,0 C0.171,0 0.77,-0.013 0.842,0.272 0.972,0.794 0.972,0.85 1,1",
    entry_ease:
      "M0,0 C0.358,0 0.336,0.209 0.442,0.519 0.59,0.952 0.768,0.918 1,1",
    entry_ease_2: "M0,0 C0.388,0.082 0.924,0.862 1,1",
    entry_ease_3: "M0,0 C0.272,0 0.472,0.454 0.496,0.496 0.66,0.79 0.685,1 1,1",
    igloo_ease_1: "M0,0 C0.662,0.073 0.047,1 1,1",
  };
  for (const [name, path] of Object.entries(eases))
    Ei.create(name, path, { precision: 2 });
  const dpr =
    window.devicePixelRatio <= 2
      ? Math.min(window.devicePixelRatio, 1.15)
      : Math.min(window.devicePixelRatio, 1.5);
  await he.init({
    canvasCnt: host,
    interactionNode: host,
    relativePath: assetPrefix,
    fingers: 2,
    audioContext: false,
    contextMenu: false,
    DPR: dpr || 1,
    adaptiveDPR: false,
    shadowMap: true,
    shadowMapType: ly,
  });
  let disposed = false,
    visible = true,
    paused = false,
    warmupFrames = 45,
    composer,
    scene,
    particle,
    projectParticles,
    clock = { time: 0, delta: 0 };
  const initialBounds = host.getBoundingClientRect();
  Object.assign(q.screen, {
    width: initialBounds.width,
    height: initialBounds.height,
    w: initialBounds.width,
    h: initialBounds.height,
    aspectRatio: initialBounds.width / initialBounds.height,
  });
  Q.emit("resize", initialBounds.width, initialBounds.height);
  const duration = kind === "igloo" ? 8.2 : kind === "icons" ? 12 : 8;
  class StudyController extends jF {
    init() {
      this.initialized = this.initialize();
    }
    async initialize() {
      this.initGlobalPlane();
      scene = new (kind === "igloo" ? F3 : UF)({ mainController: this });
      composer = new tA({ scene });
      this.scrollComposers = [composer];
      await scene.uploaded;
      this.mainMesh.material = this.material;
      for (const key of [
        "uProgress",
        "uProgressVel",
        "uDetailProgress",
        "uDetailProgress2",
      ])
        this.material.uniforms[key].value = 0;
      this.material.uniforms.uInCubes.value = false;
      scene.isSceneVisible = true;
      this.scrollBlocked = true;
      if (kind === "igloo") {
        scene.introPosition.set(-14, 21, 14);
        scene.introTarget.set(0, 0.5, 0);
        scene.progress = scene.initialScrollAutocenter;
        scene.introTL.pause(0);
        scene.manifesto.canBeShown = false;
        for (const key of ["title", "text", "copyright", "rights"])
          if (scene.manifesto[key]) scene.manifesto[key].visible = false;
      } else {
        scene.containerparticles.UI.group.visible = false;
        scene.containerparticles.UI.group.removeFromParent();
        scene.containerparticles.UI.disable();
        if (kind === "portfolio") {
          applyPortfolioPalette(scene);
          projectParticles = await createProjectParticles(
            E,
            scene,
            getPresentation,
          );
        }
        if (kind === "icons") {
          await Promise.all(
            scene.containerparticles.vdbs.map((v) => v?._loaded),
          );
          const linkedin = new DA(generateLinkedInVolume(64), 64, 64, 64);
          const template = scene.containerparticles.vdbs[1];
          for (const key of [
            "minFilter",
            "magFilter",
            "wrapS",
            "wrapT",
            "wrapR",
          ])
            linkedin[key] = template[key];
          linkedin.needsUpdate = true;
          scene.containerparticles.vdbs[3] = linkedin;
          scene.containerparticles.vdbScales[3] = 1;
          scene.containerparticles.mesh.onBeforeRender = () => {};
          E.setStudyClock(clock);
          particle = createParticleReplay(
            scene,
            { gpu: Je.webgl, globals: _i, ShaderMaterial: E.fe },
            clock,
            E,
          );
        }
      }
      this.draw = () => this.render();
      he.renderPass.scene.beforeRenderCbs.push(this.draw);
      this.isReady();
    }
    render() {
      if (disposed) return;
      const progress = clamp(getProgress());
      if (kind === "igloo") {
        scene.introTL.time(progress * duration, true);
        scene.progress = scene.initialScrollAutocenter;
      } else if (kind === "rings" || kind === "portfolio") {
        const camera =
          kind === "portfolio" ? clamp(getPresentation?.().camera || 0) : 0;
        scene.progress = 0.08 + progress * 0.435 + camera * 0.245;
        scene.containerparticles.mesh.visible = false;
      } else {
        scene.progress = 0.76;
        scene.containerparticles.mesh.visible = true;
        scene.textcylinder.mesh.visible = false;
        scene.textcylinder.mesh2.visible = false;
        particle.seek(Math.round(progress * duration * 60), 36);
        clock.time = particle.frame / 60;
        clock.delta = 0;
        _i.time.value = clock.time;
        _i.dtRatio.value = 0;
      }
      E.advanceStudyFrame();
      composer.render();
      this.material.uniforms.tScene1.value = composer.readBuffer.texture;
      this.materialLoad.uniforms.tScene.value = composer.readBuffer.texture;
      // Render a settled opening pose once, then retain the canvas unchanged.
      if (warmupFrames > 0) warmupFrames--;
      if (paused && warmupFrames === 0) he.active = false;
      onFrame?.({
        paused: paused && warmupFrames === 0,
        progress,
        busy: particle
          ? particle.frame !== Math.round(progress * duration * 60)
          : false,
      });
    }
  }
  const controller = new StudyController();
  try {
    await controller.initialized;
  } catch (error) {
    he.active = false;
    try {
      composer?.dispose();
      if (scene) Jo.prototype.dispose.call(scene);
    } catch {}
    try {
      he.dispose({ renderer: true, input: true, audioContext: false });
    } catch {}
    q.dispose();
    Q.removeAllListeners?.();
    re.globalTimeline.clear();
    re.ticker.sleep();
    throw error;
  }
  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    Object.assign(q.screen, {
      width,
      height,
      w: width,
      h: height,
      aspectRatio: width / height,
    });
    Q.emit("resize", width, height);
    warmupFrames = 45;
    he.active = visible;
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const resized = () => requestAnimationFrame(resize);
  window.addEventListener("resize", resized);
  resize();
  he.active = true;
  // Keep native procedural time, turbulence and springs alive for igloo/rings.
  function dispose() {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    window.removeEventListener("resize", resized);
    he.active = false;
    re.killTweensOf(scene);
    scene.introTL?.kill();
    scene.timeline?.kill();
    particle?.dispose();
    projectParticles?.dispose();
    composer?.dispose();
    // UF's own dispose is empty; the original base class owns its meshes.
    Jo.prototype.dispose.call(scene);
    he.dispose({ renderer: true, input: true, audioContext: false });
    q.dispose();
    Q.removeAllListeners?.();
    re.globalTimeline.clear();
    E.setStudyClock(null);
    re.ticker.sleep();
  }
  return {
    scene,
    controller,
    engine: E,
    dispose,
    resize,
    setVisible(nextVisible) {
      visible = nextVisible;
      he.active = visible && (!paused || warmupFrames > 0);
    },
    setPaused(nextPaused) {
      // Draw the final scrubbed pose before freezing on a reverse scroll.
      if (nextPaused && !paused) warmupFrames = Math.max(1, warmupFrames);
      paused = nextPaused;
      he.active = visible && (!paused || warmupFrames > 0);
    },
  };
}

function createParticleReplay(
  scene,
  { gpu, globals, ShaderMaterial },
  clock,
  E,
) {
  const controller = scene.containerparticles,
    mesh = controller.mesh,
    u = mesh.computationMaterial.uniforms;
  const snapshots = new Map();
  let current = 0;
  const copy = new ShaderMaterial({
    uniforms: {
      tPosition: { value: null },
      tVelocity: { value: null },
      uReset: { value: 0 },
    },
    vertexShader:
      "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    fragmentShader:
      "varying vec2 vUv;uniform sampler2D tPosition;uniform sampler2D tVelocity;uniform float uReset;\n#define outPos pc_fragColor\nlayout(location=1) out highp vec4 outVel;void main(){outPos=texture2D(tPosition,vUv);outVel=uReset>.5?vec4(0.0):texture2D(tVelocity,vUv);}",
    depthTest: false,
    depthWrite: false,
  });
  function blit(position, velocity, target, reset = false) {
    const oldTarget = gpu.getRenderTarget(),
      oldClear = gpu.autoClear,
      oldMaterial = mesh.fsQuad.material;
    copy.uniforms.tPosition.value = position;
    copy.uniforms.tVelocity.value = velocity || position;
    copy.uniforms.uReset.value = reset ? 1 : 0;
    mesh.fsQuad.material = copy;
    gpu.autoClear = false;
    gpu.setRenderTarget(target);
    mesh.fsQuad.render(gpu);
    mesh.fsQuad.material = oldMaterial;
    gpu.setRenderTarget(oldTarget);
    gpu.autoClear = oldClear;
  }
  function drawTextures() {
    const latest = mesh.rtCurrent === 1 ? mesh.rt1 : mesh.rt2;
    mesh.material.uniforms.tTexture1.value = latest.textures[0];
    mesh.material.uniforms.tTexture2.value = latest.textures[1];
  }
  function restore(snapshot) {
    if (snapshot) {
      for (const rt of [mesh.rt1, mesh.rt2])
        blit(snapshot.textures[0], snapshot.textures[1], rt);
    } else
      for (const rt of [mesh.rt1, mesh.rt2])
        blit(u.tOrig.value, null, rt, true);
    mesh.rtCurrent = 0;
    drawTextures();
  }
  function step(n) {
    const time = n / 60,
      { index, volume, local } = shapeAt(time);
    u.tVolume.value = controller.vdbs[volume];
    u.uVolumeScale.value = controller.vdbScales[volume];
    u.uRotation.value = Math.PI * 1.5 - local * 0.75;
    u.uAdditionalNoise.value =
      index > 0 ? Math.pow(Math.max(0, 1 - local / 0.5), 2) : 0;
    u.uShowNoise.value = index > 0 ? 0 : Math.max(0, 1 - time / 0.8);
    u.uInteractForce.value = 0;
    clock.time = time;
    clock.delta = 1000 / 60;
    globals.time.value = time;
    globals.dtRatio.value = 1;
    gpu.info.render.frame++;
    E.advanceStudyFrame();
    mesh.compute(gpu, scene, scene.camera);
    mesh.material.uniforms.uVisible.value = 1;
    mesh.material.uniforms.uAlpha.value = 1;
    mesh.material.uniforms.uInitialGlow.value = Math.max(0, 1 - time);
  }
  restore(null);
  return {
    get frame() {
      return current;
    },
    dispose() {
      copy.dispose();
      for (const rt of snapshots.values()) rt.dispose();
      snapshots.clear();
    },
    seek(target, budget) {
      let nearest = -1;
      for (const key of snapshots.keys())
        if (key <= target && key > nearest) nearest = key;
      if (target < current || (nearest > current && nearest <= target)) {
        restore(nearest >= 0 ? snapshots.get(nearest) : null);
        current = Math.max(0, nearest);
      }
      let count = 0;
      while (current < target && count++ < budget) {
        step(++current);
        if (current % 60 === 0 && !snapshots.has(current)) {
          const snapshot = mesh.rt1.clone(),
            latest = mesh.rtCurrent === 1 ? mesh.rt1 : mesh.rt2;
          blit(latest.textures[0], latest.textures[1], snapshot);
          snapshots.set(current, snapshot);
        }
      }
      // Set non-integrated presentation uniforms even at frame zero.
      const time = current / 60,
        { volume, local } = shapeAt(time);
      u.tVolume.value = controller.vdbs[volume];
      u.uVolumeScale.value = controller.vdbScales[volume];
      u.uRotation.value = Math.PI * 1.5 - local * 0.75;
      mesh.material.uniforms.uVisible.value = 1;
      mesh.material.uniforms.uAlpha.value = 1;
    },
  };
}
