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

	const currentClassName = `${style.button} ${classNameBtnType} ${className}`

	return (
		<BasicBtnWrapper className={currentClassName} href={href} target={target}>
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
		</BasicBtnWrapper>
	)
}

export default BasicBtn
