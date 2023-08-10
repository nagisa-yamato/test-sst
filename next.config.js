// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/**",
      },
    ],
  },
  async rewrites() {
    const destination = process.env.API_ENDPOINT;
    if (destination === undefined) {
      throw new Error("API_ENDPOINT is not defined");
    }
    return [
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              source: "/api/graphql",
              destination,
            },
          ]
        : []),
    ];
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
