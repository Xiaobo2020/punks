/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ord.ordinals.market",
      },
    ],
  },
};

module.exports = nextConfig;
