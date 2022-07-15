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
    serviceUrl: process.env.PUBLIC_SCAN_SERVICE_URL,
    manifestServiceUrl: `${process.env.PUBLIC_SCAN_SERVICE_URL}/manifest`,
    metadataServiceUrl: `${process.env.PUBLIC_SCAN_SERVICE_URL}/metadata`,
    bootstrapServiceUrl: `${process.env.PUBLIC_BOOTSTRAP_SERVICE_URL}`,
  },
  webpack: (config, { isServer, webpack }) => { 

    config.plugins.push(new webpack.IgnorePlugin(/@blueprintjs\/(core|icons)/));
    return config;
  }
}

module.exports = nextConfig
