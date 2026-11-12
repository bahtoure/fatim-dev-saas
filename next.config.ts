import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* On le place directement à la racine ici */
  devIndicators: false,
  allowedDevOrigins: ['192.168.1.89:3000', 'localhost:3000']
};

export default nextConfig;
