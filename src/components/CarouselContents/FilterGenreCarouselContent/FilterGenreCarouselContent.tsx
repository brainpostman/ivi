import { useCustomCarouselContent } from '@/hooks/useCustomCarouselContent'
import { FC, useLayoutEffect, useRef } from 'react'
import style from './FilterGenreCarouselContent.module.scss'

interface IProps {
	icon: React.ReactElement
	title: string
	ref: any
}

const FilterGenreCarouselContent: FC<IProps> = (
	{ icon, title },
	addElementLen
) => {
	const wrapperRef = useCustomCarouselContent(addElementLen)

	return (
		<div className={style.wrapper} ref={wrapperRef}>
			{icon}
			<p>{title}</p>
		</div>
	)
}

export default FilterGenreCarouselContent
