/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["suite-mate.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
