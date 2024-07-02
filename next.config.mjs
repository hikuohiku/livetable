/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.ggpht.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
