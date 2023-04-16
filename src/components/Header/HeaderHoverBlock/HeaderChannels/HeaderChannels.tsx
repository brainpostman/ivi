import { headerTvBlockData } from '@/data/headerTVBlock.data'
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HeaderChannels.module.scss'

const HeaderChannels = () => {
	return (
		<ul className={style.wrapper}>
			{headerTvBlockData.map(channelList => (
				<li key={channelList.title}>
					<p className={styleParent.title}>{channelList.title}</p>
					<HeaderCarousel
						blockList={channelList}
						elementLen={88 + 16}
						elemntsMove={5}
						elementsView={6}
					/>
				</li>
			))}
		</ul>
	)
}

export default HeaderChannels
