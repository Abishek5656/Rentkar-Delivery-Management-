/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <--- This disables ESLint during builds
  },
};

export default nextConfig;

