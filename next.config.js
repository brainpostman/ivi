/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.js';

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `@import "./src/styles/vars.scss"; @import "./src/styles/index.scss"; @import "./src/styles/ui-kit.scss";`,
    },
    images: {
        domains: ['thumbs.dfs.ivi.ru'],
    },
    i18n,
};

export default nextConfig;
