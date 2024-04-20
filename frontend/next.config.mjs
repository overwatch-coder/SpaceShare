/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // add cloudinary image hosting
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
