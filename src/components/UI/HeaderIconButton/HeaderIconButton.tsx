import { IIconHedaderIconButton } from '@/types/button.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'
import style from './HeaderIconButton.module.scss'

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	icon: IIconHedaderIconButton
	customIcon?: React.ReactElement
}

const HeaderIconButton: FC<IProps> = ({
	children,
	icon,
	customIcon,
	...props
}) => {
	const className = `text ${style.wrapper}`

	const getIcon = () => {
		switch (icon) {
			case 'search':
				return <RiSearchLine />
			case 'notification':
				return <MdOutlineNotifications />
			default:
				return customIcon || <></>
		}
	}

	return (
		<div className={className} {...props}>
			<div className={style.container}>
				{getIcon()}
				{children}
			</div>
		</div>
	)
}

export default HeaderIconButton
