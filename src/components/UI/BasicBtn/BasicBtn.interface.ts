import { IBtnType } from '@/types/button.interface'
import { HTMLAttributeAnchorTarget } from 'react'

// @href - работает как обычная ссылка
// @navlink - работает как тэг Link

export interface IBasicBtnProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	btnType?: IBtnType
	href?: string
	navlink?: string
	suptitle?: string
	title?: string
	target?: HTMLAttributeAnchorTarget
}
