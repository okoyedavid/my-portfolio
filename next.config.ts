import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/#selected-work",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/#resume",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#engineering-mindset",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
