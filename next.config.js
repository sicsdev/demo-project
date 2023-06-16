/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dam.freshworks.com', 'www.freshworks.com', 'assets-global.website-files.com', 'static.intercomassets.com', 'res.cloudinary.com', 'randomuser.me'],
        unoptimized: true,
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',
}

module.exports = nextConfig
