/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    //https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [{ protocol: "https", hostname: "**.amazonaws.com" }],
  },
};

module.exports = nextConfig;
