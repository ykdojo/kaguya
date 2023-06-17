/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async headers() {
    return [
      {
        // Use a wildcard to match any path
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://chat.openai.com",
          },
          {
            // Allow both GET and POST requests
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
        ],
      },
    ];
  },
  ...nextConfig,
};
