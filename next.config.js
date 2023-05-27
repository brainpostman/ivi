/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `@import "./src/styles/vars.scss"; @import "./src/styles/index.scss"; @import "./src/styles/ui-kit.scss"; @import "./src/styles/adaptive.scss"; `,
    },
    images: {
        domains: ['thumbs.dfs.ivi.ru', 'avatars.mds.yandex.net', 'www.images.ru', 'www.ivi.ru'],
    },
    i18n,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
module.exports = nextConfig;
