const nextConfig = {
  images: {
    domains: [
      "dam.freshworks.com",
      "www.freshworks.com",
      "assets-global.website-files.com",
      "static.intercomassets.com",
      "res.cloudinary.com",
      "randomuser.me",
      "avatars.slack-edge.com",
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'export',
  reactStrictMode: true,
  // Elimina la sección sentry
}

module.exports = nextConfig;
