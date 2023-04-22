import { IHeaderBroadCast } from '@/types/hoverblock.interface'
import Image from 'next/image'
import { FC } from 'react'
import styleParent from '../HeaderCarousel.module.scss'
import style from './HedaerCarouselBroadcasts.module.scss'

interface IProps {
	move: number
	blockList: IHeaderBroadCast[]
}

const HedaerCarouselBroadcasts: FC<IProps> = ({ move, blockList }) => {
	const translate = `translate3d(-${move}px, 0, 0)`
	return (
		<ul
			className={`${styleParent.list} ${style.broadcastsList}`}
			style={{ transform: translate }}
		>
			{blockList.map(broadcast => (
				<li key={broadcast.img}>
					<Image src={broadcast.img} alt='broadcast' width={58} height={38} />
					<div className={style.info}>
						<p className={style.title}>{broadcast.title}</p>
						<p className={style.info__bottom}>
							<span>{broadcast.date}</span> • <span>{broadcast.category}</span>
						</p>
					</div>
				</li>
			))}
		</ul>
	)
}

export default HedaerCarouselBroadcasts
