import { fileURLToPath } from "node:url";

const config = {
  plugins: {
    [fileURLToPath(new URL("./lib/postcss-tailwind-directives.cjs", import.meta.url))]: {},
  },
};

export default config;
