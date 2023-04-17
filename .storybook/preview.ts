import type { Preview } from '@storybook/react'
import DocsTemplate from '../src/stories/DocsTemplate.mdx'
import '../src/styles/globals.scss'

const preview: Preview = {
	parameters: {
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
