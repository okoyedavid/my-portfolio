/** Tint only the portfolio instance; the original study routes keep their palette. */
export function applyPortfolioPalette(scene) {
  const material = scene.floor.mesh.material;
  const amber = material.uniforms.uColor1.value.clone().set("#f59e0b");
  material.uniforms.uPortfolioAmber = { value: amber };
  // The original mesh already separates its illuminated vertical faces. Change
  // their light only inside the inner rings, retaining the ice and outer rim.
  material.fragmentShader = material.fragmentShader
    .replace(
      "uniform vec3 uColor1;",
      "uniform vec3 uColor1;\nuniform vec3 uPortfolioAmber;",
    )
    .replace(
      "vec3 blue = vec3(0.5, 0.7, 1.0);",
      "vec3 blue = mix(vec3(0.5, 0.7, 1.0), uPortfolioAmber * 1.75, 1.0 - smoothstep(0.72, 1.08, posLen));",
    );
  material.needsUpdate = true;
  // Apply the accent to every travel ring, including the first.
  for (const mesh of scene.rings.meshes) {
    const ring = mesh.material;
    ring.uniforms.uPortfolioAmber = { value: amber };
    ring.fragmentShader = ring.fragmentShader
      .replace(
        "uniform vec3 uColor1;",
        "uniform vec3 uColor1;\nuniform vec3 uPortfolioAmber;",
      )
      .replace(
        "texture2D(tGlow, vUv).r * vec3(0.5, 0.7, 1.0)",
        "texture2D(tGlow, vUv).r * uPortfolioAmber * 1.75",
      );
    ring.needsUpdate = true;
  }
  // The bright portal halo is separate from the fractured-ring material. These
  // shared forcefield/plasma shaders must also use amber instead of icy blue.
  const energyMaterials = new Set([
    scene.ringforcefield.mesh0.material,
    scene.plasma.mesh0.material,
  ]);
  for (const energy of energyMaterials) {
    energy.uniforms.uPortfolioAmber = { value: amber };
    energy.fragmentShader = energy.fragmentShader
      .replace("void main() {", "uniform vec3 uPortfolioAmber;\nvoid main() {")
      .replace(
        "vec3 color = vec3(0.7, 0.8, 1.0);",
        "vec3 color = uPortfolioAmber * 1.5;",
      )
      .replace(
        "vec3 color = vec3(0.65, 0.8, 1.0);",
        "vec3 color = uPortfolioAmber * 1.5;",
      );
    energy.needsUpdate = true;
  }
}
