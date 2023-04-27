import Header from '@/components/Header/Header'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Header>

const meta: Meta = {
	title: 'Header',
	parameters: {
		docs: {
			description: {
				component: 'Шапка сайта',
			},
		},
	},
	component: Header,
}

export const Primary: Story = {}

export default meta
