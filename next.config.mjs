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
    qualities: [75, 80, 100],
    remotePatterns: [
      // Existing Supabase bucket (cabins)
      {
        protocol: "https",
        hostname: "uxgjntbwscvjvrvokima.supabase.co",
        pathname: "/storage/v1/object/public/cabin-image/**",
      },

      // Existing Supabase bucket (avatars)
      {
        protocol: "https",
        hostname: "uxgjntbwscvjvrvokima.supabase.co",
        pathname: "/storage/v1/object/public/avatars/**",
      },

      // ⭐ NEW: Allow country flags from flagcdn.com
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
