import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import style from './ExpandInfo.module.scss'

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	title?: string
	visibleText?: string
}

const ExpandInfo: FC<IProps> = ({
	children,
	title,
	visibleText,
	className,
	...props
}) => {
	const [isExpand, setIsExpand] = useState(false)

	const onClickToggle = () => setIsExpand(prev => !prev)

	return (
		<article className={`${style.info} ${className}`} {...props}>
			{title && <h1 className={style.info__title}>{title}</h1>}

			{visibleText && (
				<p
					className={`${style.info__body__top} ${
						isExpand ? style.visible : ''
					}`}
				>
					{visibleText}
				</p>
			)}

			{isExpand && children}

			<p className={style.toggle} onClick={onClickToggle}>
				{isExpand ? 'Свернуть' : 'Развернуть'}
			</p>
		</article>
	)
}

export default ExpandInfo
