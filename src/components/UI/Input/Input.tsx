import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import style from './Input.module.scss'

const Input: FC<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ type = 'text', ...props }) => {
	const currentClassName = type === 'number' ? style.number : style.text

	return <input type={type} className={currentClassName} {...props} />
}

export default Input
