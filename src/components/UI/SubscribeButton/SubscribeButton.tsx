import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './SubscribeButton.module.scss'

const SubscribeButton: FC<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
	return (
		<button className={style.button} {...props}>
			{children}
		</button>
	)
}

export default SubscribeButton
