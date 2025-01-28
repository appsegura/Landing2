/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'output',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;