// const { withSentryConfig } = require("@sentry/nextjs");


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
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  reactStrictMode: false,
}




// const sentryConfig = {
//   silent: true,
//   org: "tempo-ee56a7c44",
//   project: "tempo-ai",
// }


module.exports = nextConfig; // Desactiva Sentry temporalmente


// module.exports = withSentryConfig(
//   nextConfig,
//   sentryConfig
// );
