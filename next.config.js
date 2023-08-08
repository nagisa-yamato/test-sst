/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "https://rickandmortyapi.com/graphql",
      },
    ];
  },
};

module.exports = nextConfig;
