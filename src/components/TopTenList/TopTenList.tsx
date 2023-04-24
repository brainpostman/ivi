import { topTenListData } from '@/data/topTenList.data'
import Image from 'next/image'
import React from 'react'
import TopTenCarouselContent from '../CarouselContents/TopTenCarouselContent/TopTenCarouselContent'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import style from './TopTenList.module.scss'

const TopTenList: React.FC = () => {
	return (
		<div className={style.wrapper}>
			<div className={style.title}>
				<Image
					src='https://solea-parent.dfs.ivi.ru/picture/bypass/top10.svg'
					alt='top10'
					width={116}
					height={28}
				/>
				<span>за неделю</span>
			</div>

			<CustomCarousel
				data={topTenListData}
				href='/'
				children={TopTenCarouselContent}
				elementsMove={4}
				elementsView={5}
				classNameWrapper={style.carousel_wrapper}
				classNameList={style.carousel_list}
			/>
		</div>
	)
}
export default TopTenList
