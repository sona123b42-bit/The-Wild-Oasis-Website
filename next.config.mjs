import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    enabled: false,
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uxgjntbwscvjvrvokima.supabase.co", // <-- replace with your Supabase project ref
        port: "",
        pathname: "/storage/v1/object/public/cabin-image/**",
      },
    ],
  },
};

export default nextConfig;
