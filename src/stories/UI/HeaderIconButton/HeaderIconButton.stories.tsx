import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton'
import { Meta, StoryObj } from '@storybook/react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'

type Story = StoryObj<typeof HeaderIconButton>

const meta: Meta = {
	title: 'UI/HeaderIconButton',
	parameters: {
		docs: {
			description: {
				component: 'Кнопка с иконкой для шапки сайта',
			},
		},
	},
	component: HeaderIconButton,
	argTypes: {
		children: {
			name: 'label',
			description: 'Текст кнопки',
		},
		icon: {
			description: 'Вариант иконки',
			control: 'select',
		},
		customIcon: {
			table: {
				disable: true,
			},
		},
	},
}

export const Search: Story = {
	args: {
		children: 'Поиск',
		icon: 'search',
	},
}

export const Notification: Story = {
	args: {
		icon: 'notification',
	},
}

export default meta
