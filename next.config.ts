import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' to allow dynamic rendering on Vercel
  // Static export is incompatible with server-side features like useSearchParams
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
