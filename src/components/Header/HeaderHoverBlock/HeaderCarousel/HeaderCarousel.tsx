import { IHeaderBroadCast, IHeaderChannels } from '@/types/hoverblock.interface'
import Image from 'next/image'
import { FC, useState } from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import style from './HeaderCarousel.module.scss'
import { getCarouselFunction } from './HeaderCarousel.util'

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

	const translate = `translate3d(-${move}px, 0, 0)`

	const { onClickLeftArrow, onClickRightArrow, viewArrow } =
		getCarouselFunction(
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
					// CHANNELS
					<ul
						className={`${style.list} ${style.channelList}`}
						style={{ transform: translate }}
					>
						{blockList.channels.map(channel => (
							<li key={channel.img}>
								<Image src={channel.img} alt='channel' width={88} height={58} />
							</li>
						))}
					</ul>
				) : (
					// BROADCASTS
					<ul
						className={`${style.list} ${style.broadcastsList}`}
						style={{ transform: translate }}
					>
						{blockList.map(broadcast => (
							<li key={broadcast.img}>
								<Image
									src={broadcast.img}
									alt='broadcast'
									width={58}
									height={38}
								/>
								<div className={style.broadcastInfo}>
									<p className={style.broadcastTitle}>{broadcast.title}</p>
									<p className={style.broadcastInnerBottomInfo}>
										<span>{broadcast.date}</span> •{' '}
										<span>{broadcast.category}</span>
									</p>
								</div>
							</li>
						))}
					</ul>
				)}
				<div className={`${style.rightShadow} ${viewArrow('right')}`}></div>
			</div>
			<div className={style.arrows}>
				<div onClick={onClickLeftArrow} className={viewArrow('left')}>
					<MdArrowBackIos />
				</div>
				<div
					onClick={() => onClickRightArrow(blockList)}
					className={viewArrow('right')}
				>
					<MdArrowBackIos />
				</div>
			</div>
		</div>
	)
}

export default HeaderCarousel
