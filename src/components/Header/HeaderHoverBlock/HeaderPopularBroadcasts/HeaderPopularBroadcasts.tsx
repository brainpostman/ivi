import { headerPopularBroadcastsData } from '@/data/headerTVBlock.data'
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HeaderPopularBroadcasts.module.scss'

const HeaderPopularBroadCasts = () => {
	return (
		<div className={style.wrapper}>
			<p className={styleParent.title}>Популярные трансляции</p>
			<ul>
				<HeaderCarousel
					blockList={headerPopularBroadcastsData}
					elementLen={260 + 16}
					elemntsMove={3}
					elementsView={3}
				/>
			</ul>
		</div>
	)
}

export default HeaderPopularBroadCasts
