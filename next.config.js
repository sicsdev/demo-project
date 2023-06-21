/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dam.freshworks.com",
      "www.freshworks.com",
      "assets-global.website-files.com",
      "static.intercomassets.com",
      "res.cloudinary.com",
      "randomuser.me",
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

module.exports = nextConfig;
