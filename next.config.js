/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Remove trailing slashes from non-root paths
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
