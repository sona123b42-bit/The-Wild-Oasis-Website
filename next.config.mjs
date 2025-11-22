import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      // Existing bucket — KEEP THIS
      {
        protocol: "https",
        hostname: "uxgjntbwscvjvrvokima.supabase.co",
        pathname: "/storage/v1/object/public/cabin-image/**",
      },

      // ➕ ADD THIS NEW ONE FOR PROFILE PHOTOS
      {
        protocol: "https",
        hostname: "uxgjntbwscvjvrvokima.supabase.co",
        pathname: "/storage/v1/object/public/avatars/**",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
