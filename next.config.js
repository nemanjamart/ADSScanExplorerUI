/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  serverRuntimeConfig: {
    manifestServiceUrl: `${process.env.SCAN_SERVICE_URL}/manifest`,
    metadataServiceUrl: `${process.env.SCAN_SERVICE_URL}/metadata`,
  },
  publicRuntimeConfig: {
    publicManifestServiceUrl: `${process.env.PUBLIC_SCAN_SERVICE_URL}/manifest`,
    publicMetadataServiceUrl: `${process.env.PUBLIC_SCAN_SERVICE_URL}/metadata`,
  },
}

module.exports = nextConfig
