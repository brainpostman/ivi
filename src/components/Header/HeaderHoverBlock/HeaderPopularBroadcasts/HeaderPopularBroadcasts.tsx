import { headerPopularBroadcastsData } from '@/data/headerTVBlock.data'
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel'
import styleParent from '../HeaderHoverBlock.module.scss'

const HeaderPopularBroadCasts = () => {
	return (
		<div>
			<p className={styleParent.title}>Популярные трансляции</p>
			<HeaderCarousel
				blockList={headerPopularBroadcastsData}
				elementLen={262 + 16}
				elemntsMove={2}
				elementsView={2}
			/>
		</div>
	)
}

export default HeaderPopularBroadCasts
