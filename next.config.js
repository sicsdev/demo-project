const { withSentryConfig } = require("@sentry/nextjs");


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
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
}


module.exports = withSentryConfig(
  nextConfig,
  {
    //Sentry config
    silent: true,
    org: "tempo-ee56a7c44",
    project: "tempo-ai",
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);