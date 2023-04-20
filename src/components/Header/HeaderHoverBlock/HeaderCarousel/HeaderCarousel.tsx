import { IHeaderBroadCast, IHeaderChannels } from '@/types/hoverblock.interface'
import { FC, useState } from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { getCarouselFunctions } from '../../../../utils/carousel.util'
import style from './HeaderCarousel.module.scss'
import HedaerCarouselBroadcasts from './HedaerCarouselBroadcasts/HedaerCarouselBroadcasts'
import HedaerCarouselChannels from './HedaerCarouselChannels/HedaerCarouselChannels'

// @elementsView - Количество элементов, которые отображаются в карусели
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blockList - данные для элементов карусели

interface IProps {
	blockList: IHeaderChannels | IHeaderBroadCast[]
	elementLen: number
	elemntsMove: number
	elementsView: number
}

const HeaderCarousel: FC<IProps> = ({
	blockList,
	elementLen,
	elemntsMove,
	elementsView,
}) => {
	const [move, setMove] = useState(0)

	const { onClickLeftArrow, onClickRightArrow, viewArrow } =
		getCarouselFunctions(
			move,
			setMove,
			elementLen,
			elemntsMove,
			elementsView,
			blockList
		)

	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				{'title' in blockList ? (
					<HedaerCarouselChannels move={move} blockList={blockList} />
				) : (
					<HedaerCarouselBroadcasts move={move} blockList={blockList} />
				)}
				<div
					className={`${style.shadow} ${style.shadow_left} ${viewArrow(
						'left'
					)}`}
				></div>
				<div className={`${style.shadow} ${viewArrow('right')}`}></div>
			</div>
			<div className={style.arrows}>
				<div onClick={onClickLeftArrow} className={viewArrow('left')}>
					<MdArrowBackIos />
				</div>
				<div onClick={onClickRightArrow} className={viewArrow('right')}>
					<MdArrowBackIos />
				</div>
			</div>
		</div>
	)
}

export default HeaderCarousel
