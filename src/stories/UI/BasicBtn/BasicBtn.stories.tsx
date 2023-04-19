import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { Meta } from '@storybook/react'
import React from 'react'
import { BiDevices } from 'react-icons/bi'
import {
	FaApple,
	FaGooglePlay,
	FaLinkedinIn,
	FaOdnoklassniki,
	FaTelegramPlane,
	FaTv,
	FaTwitter,
	FaViber,
	FaVk,
} from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

const iconsforTypeIconCircle = {
	empty: <></>,
	linkedin: <FaLinkedinIn />,
	OK: <FaOdnoklassniki />,
	Telegram: <FaTelegramPlane />,
	Twitter: <FaTwitter />,
	Viber: <FaViber />,
	VK: <FaVk />,
}

const iconsForTypeTextPlusIcon = {
	empty: <></>,
	Apple: <FaApple />,
	GooglePlay: <FaGooglePlay />,
	TV: <FaTv />,
	'Все устройства': <BiDevices />,
}

const iconsForTypeIcon = {
	email: <GoMail />,
	phone: <FiPhone />,
}

const meta: Meta = {
	title: 'UI/BasicBtn',
	parameters: {
		docs: {
			description: {
				component: 'Самая часто используемая кнопка сайта',
			},
		},
		backgrounds: { default: 'darkSoft' },
	},
	component: BasicBtn,
	argTypes: {
		children: {
			name: 'label',
			description: 'Текст кнопки',
			if: {
				arg: 'btnType',
				eq: 'text',
			},
		},

		href: {
			name: 'url',
			description: 'Ссылка',
		},

		navlink: {
			table: {
				disable: true,
			},
		},

		btnType: {
			name: 'variant',
			description: 'Вариант внешнего вида',
			control: 'select',
		},

		target: {
			description: 'Поведение при клике',
			options: ['_blank', '_parent', '_self', '_top'],
			if: {
				arg: 'href',
				truthy: true,
			},
		},

		title: {
			description: 'Главный текст',
			defaultValue: '',
			if: {
				arg: 'btnType',
				eq: 'textPlusIcon',
			},
		},

		suptitle: {
			description: 'Надзголовок',
			defaultValue: '',
			if: {
				arg: 'btnType',
				eq: 'textPlusIcon',
			},
		},

		iconsforTypeIcon: {
			name: 'icon',
			description: 'Иконка',
			options: Object.keys(iconsforTypeIconCircle),
			mapping: iconsforTypeIconCircle,
			control: 'select',
			if: {
				arg: 'btnType',
				eq: 'iconCircle',
			},
		},

		iconsForTypeTextPlusIcon: {
			name: 'icon',
			description: 'Иконка',
			options: Object.keys(iconsForTypeTextPlusIcon),
			mapping: iconsForTypeTextPlusIcon,
			control: 'select',
			if: {
				arg: 'btnType',
				eq: 'textPlusIcon',
			},
		},

		iconsForTypeIcon: {
			name: 'icon',
			description: 'Иконка',
			options: Object.keys(iconsForTypeIcon),
			mapping: iconsForTypeIcon,
			control: 'select',
			if: {
				arg: 'btnType',
				eq: 'icon',
			},
		},
	},
}

export const Primary = ({
	children,
	iconsforTypeIcon,
	iconsForTypeTextPlusIcon,
	iconsForTypeIcon,
	...props
}: {
	children: string
	iconsforTypeIcon?: React.ReactElement
	iconsForTypeTextPlusIcon?: React.ReactElement
	iconsForTypeIcon?: React.ReactElement
} & typeof BasicBtn) => (
	<BasicBtn {...props}>
		{iconsForTypeIcon || iconsForTypeTextPlusIcon || iconsforTypeIcon}
		{children}
	</BasicBtn>
)

Primary.args = {
	children: 'Написать в чате',
	btnType: 'text',
	href: '',
	target: '_blank',
	title: '',
	suptitle: '',
}

export default meta
