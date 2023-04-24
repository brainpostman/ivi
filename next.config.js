/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "./src/styles/vars.scss"; @import "./src/styles/index.scss"; @import "./src/styles/ui-kit.scss";`,
  },
  images: {
    domains: ['thumbs.dfs.ivi.ru'],
  },
}

module.exports = nextConfig
