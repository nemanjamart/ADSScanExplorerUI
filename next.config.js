/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  serverRuntimeConfig: {
    manifestServiceUrl: process.env.MANIFEST_SERVICE_URL,
    metadataServiceUrl: process.env.METADATA_SERVICE_URL,
    imageApiUrl: process.env.IMAGE_SERVER_URL,
  },
}

module.exports = nextConfig
