import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  webpackFinal: async (config, { configType }) => {
    if (config.resolve)
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src/'),
      }

    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve || {}).fallback,
        fs: false,
        stream: false,
        os: false,
      },
    }

    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}
export default config
