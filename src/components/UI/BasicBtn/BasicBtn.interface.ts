import { IBtnType } from '@/types/button.interface'
import { HTMLAttributeAnchorTarget } from 'react'

export interface IBasicBtnProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	btnType: IBtnType
	href?: string
	suptitle?: string
	title?: string
	target?: HTMLAttributeAnchorTarget
}
