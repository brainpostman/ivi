import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import style from './HeaderIconButton.module.scss'

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	icon?: React.ReactElement
}

const HeaderIconButton: FC<IProps> = ({ children, icon, ...props }) => {
	const className = `text ${style.wrapper}`

	return (
		<div className={className} {...props}>
			<div className={style.container}>
				{icon}
				{children}
			</div>
		</div>
	)
}

export default HeaderIconButton
