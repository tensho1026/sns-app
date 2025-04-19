import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.clerk.com'], // ← Clerkの画像CDNを許可
  },
};

export default nextConfig;
