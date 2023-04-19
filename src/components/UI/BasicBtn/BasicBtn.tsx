import { IBtnType } from '@/types/button.interface'
import { FC, PropsWithChildren } from 'react'
import style from './BasicBtn.module.scss'

export interface IBasicBtnProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	btnType: IBtnType
	href?: string
	suptitle?: string
	title?: string
}

const getClassNameBtnType = (btnType: IBtnType) => {
	switch (btnType) {
		case 'textPlusIcon':
			return style.textPlusIcon
		case 'icon':
			return style.icon
		case 'iconCircle':
			return style.iconCircle
		default:
			return style.text
	}
}

const WrapperButton: FC<
	PropsWithChildren<{ href: string | undefined; className: string }>
> = ({ href, className, children }) =>
	href ? (
		<a href={href} target='_blank' rel='noreferrer' className={className}>
			{children}
		</a>
	) : (
		<>{children}</>
	)

const BasicBtn = ({
	className = '',
	btnType = 'text',
	children,
	title,
	suptitle,
	href,
	...props
}: IBasicBtnProps) => {
	const classNameBtnType = getClassNameBtnType(btnType)

	return (
		<WrapperButton className={className} href={href}>
			<button
				className={`${style.button} ${classNameBtnType} ${
					href ? '' : className
				}`}
				{...props}
			>
				{btnType === 'textPlusIcon' ? (
					<>
						{children}
						<div className={style.description}>
							{suptitle && <p className={style.suptitle}>{suptitle}</p>}
							<p className={style.title}>{title}</p>
						</div>
					</>
				) : (
					children
				)}
			</button>
		</WrapperButton>
	)
}

export default BasicBtn
