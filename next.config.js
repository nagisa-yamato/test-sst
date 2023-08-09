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
    return [
      {
        source: "/api/graphql",
        destination: process.env.API_ENDPOINT,
      },
    ];
  },
};

module.exports = nextConfig;
