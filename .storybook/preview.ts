import type { Preview } from '@storybook/react'
import DocsTemplate from '../src/stories/DocsTemplate.mdx'
import '../src/styles/globals.scss'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#100e19' },
        { name: 'darkSoft', value: '#353147' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      page: DocsTemplate,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
