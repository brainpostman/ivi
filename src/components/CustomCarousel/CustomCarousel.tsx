import { useCustomCarousel } from '@/hooks/useCustomCarousel'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React, { FC, memo, useMemo, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarousel.module.scss'

// FIXME: УБРАТЬ any

// @elementsView - Количество элементов, которые отображаются в карусели (указываем на 1 элемент меньше)
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blockList - данные для элементов карусели

type IWidth = 'full' | 'fit'

interface IProps {
	elementsView: number
	elementsMove: number
	title?: string
	data: any[]
	href?: Url
	children: FC<any>
	additElem?: FC<any>
	classNameList?: string
	classNameWrapper?: string
	arrowSize?: number
	space?: number
	speed?: number
	width?: IWidth
}

const formatWidth = (
	width: IWidth,
	elementLens: number[],
	elementsView: number,
	space: number
) => {
	if (width === 'full') return 1225
	return (
		elementLens
			.slice(0, elementsView)
			.reduce((accum, item) => accum + item, 0) - space
	)
}

const CustomCarousel: FC<IProps> = ({
	elementsMove,
	elementsView,
	title,
	href,
	data,
	children,
	additElem,
	classNameList,
	classNameWrapper,
	arrowSize = 32,
	space = 24,
	speed = 400,
	width = 'full',
}) => {
	const [elementLens, setElementLens] = useState<number[]>([])

	const containerWidth = formatWidth(width, elementLens, elementsView, space)

	const addElementLen = (len: number) =>
		setElementLens(prev => [...prev, len + space])

	const { onClickRightArrow, onClickLeftArrow, viewArrow, move } =
		useCustomCarousel(elementLens, elementsView, elementsMove)

	const translate = `translate3d(-${move}px, 0, 0)`

	return (
		<article className={`${style.wrapper} ${classNameWrapper}`}>
			{title && href && (
				<Link href={href} className={style.wrapperTitle}>
					<p>{title}</p>
					<MdArrowBackIosNew />
				</Link>
			)}

			<div className={style.wrapperCarousel}>
				<div className={style.container} style={{ width: containerWidth }}>
					<div
						className={`${style.list} ${classNameList}`}
						style={{
							transform: translate,
							gap: `${space}px`,
							transitionDuration: `${speed}ms`,
						}}
					>
						{data.map(el => children(el, addElementLen))}
						{additElem && additElem(addElementLen)}
					</div>
					<div className={style.arrows}>
						<div
							onClick={onClickLeftArrow}
							className={viewArrow('left')}
							style={{ left: `-${arrowSize + 4}px` }}
						>
							<MdArrowBackIosNew
								style={{ width: arrowSize, height: arrowSize }}
							/>
						</div>
						<div
							onClick={onClickRightArrow}
							className={viewArrow('right')}
							style={{ right: `-${arrowSize + 4}px` }}
						>
							<MdArrowBackIosNew
								style={{ width: arrowSize, height: arrowSize }}
							/>
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}

export default memo(CustomCarousel)
