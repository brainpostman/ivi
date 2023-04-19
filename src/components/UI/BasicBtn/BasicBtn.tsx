import { FC } from 'react'
import { IBasicBtnProps } from './BasicBtn.interface'
import style from './BasicBtn.module.scss'
import { getClassNameBtnType } from './BasicBtn.util'
import BasicBtnWrapper from './BasicBtnWrapper/BasicBtnWrapper'

const BasicBtn: FC<IBasicBtnProps> = ({
	className = '',
	btnType = 'text',
	children,
	title,
	suptitle,
	target,
	href,
	...props
}) => {
	const classNameBtnType = getClassNameBtnType(btnType)

	return (
		<BasicBtnWrapper className={className} href={href} target={target}>
			<button
				className={`${style.button} ${classNameBtnType} ${className}`}
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
		</BasicBtnWrapper>
	)
}

export default BasicBtn
