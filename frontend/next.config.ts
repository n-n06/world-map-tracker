import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  devIndicators: false // Use in Production
  /* config options here */
};

export default nextConfig;
