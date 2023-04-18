import { IHeaderChannels } from '@/types/hoverblock.interface'
import Image from 'next/image'
import { FC } from 'react'
import styleParent from '../HeaderCarousel.module.scss'
import style from './HedaerCarouselChannels.module.scss'

interface IProps {
	move: number
	blockList: IHeaderChannels
}

const HedaerCarouselChannels: FC<IProps> = ({ move, blockList }) => {
	const translate = `translate3d(-${move}px, 0, 0)`

	return (
		<ul
			className={`${styleParent.list} ${style.channelList}`}
			style={{ transform: translate }}
		>
			{blockList.channels.map(channel => (
				<li key={channel.img}>
					<Image src={channel.img} alt='channel' width={88} height={58} />
				</li>
			))}
		</ul>
	)
}

export default HedaerCarouselChannels
