/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },

  // comment for render twice issue
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
}
