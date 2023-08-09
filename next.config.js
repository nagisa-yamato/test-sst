/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
