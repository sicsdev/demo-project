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
    output: 'export',
    reactStrictMode: true,
    // async rewrites() {
    //   return [
    //     {
    //       source: "/robots.txt",
    //       destination: "/api/robots",
    //     },
    //   ];
    // },

    // To use Amazon s3 we need to use output export, but this is not compatible with rewrites.
  };
  
  module.exports = nextConfig;


  
