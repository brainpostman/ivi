import { IVarButton } from '@/types/button.interface'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './HighlightButton.module.scss'

interface IProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: IVarButton
}

const HighlightButton: FC<IProps> = ({
	children,
	variant = 'primary',
	...props
}) => {
	const additClassName = variant === 'secondary' ? style.secondary : ''
	const className = `${style.button} ${additClassName}`

	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}

export default HighlightButton
