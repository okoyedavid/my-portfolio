/* eslint-disable @typescript-eslint/no-require-imports -- Next loads PostCSS plugins through CommonJS. */
const postcss = require("postcss");
const tailwind = require("@tailwindcss/postcss");

// Plain CSS modules need no Tailwind pass. Keep their transforms independent
// of the shared, long-lived development worker's Tailwind processing state.
module.exports = function tailwindDirectives() {
  return {
    postcssPlugin: "portfolio-tailwind-directives",
    async Once(root, { result }) {
      if (!/@(?:import|tailwind|apply|reference|variant|theme|utility|config|plugin|custom-variant)\b|\btheme\(/.test(root.toString())) return;
      const transformed = await postcss([tailwind()]).process(root.clone(), {
        ...result.opts,
        map: false,
      });
      root.removeAll();
      root.append(transformed.root.nodes);
      result.messages.push(...transformed.messages);
    },
  };
};
module.exports.postcss = true;
