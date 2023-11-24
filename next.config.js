/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itbook.store',
        port: '',
        pathname: '/img/books/**',
      },
    ],
  },
}

module.exports = nextConfig
