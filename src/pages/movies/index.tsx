import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import ExpandInfo from '@/components/ExpandInfo/ExpandInfo'
import FilterBlock from '@/components/FilterBlock/FilterBlock'
import Sort from '@/components/Sort/Sort'
import VioletButton from '@/components/UI/VioletButton/VioletButton'
import { moviesPageInfoData } from '@/data/moviesPage.data'
import { yearCarouselData } from '@/data/yearCarousel.data'
import PageLayout from '@/layouts/PageLayout'
import style from './index.module.scss'

const title =
	'Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru'

const visibleText = moviesPageInfoData[0]

const MoviesPage = () => {
	return (
		<PageLayout title={title}>
			{/*BREAD CRUMBS*/}

			<h1 className={style.title}>Фильмы смотреть онлайн</h1>

			<ExpandInfo visibleText={visibleText}>
				<div className={style.info}>
					{moviesPageInfoData.slice(1).map((info, index) => (
						<p key={index}>{info}</p>
					))}
				</div>
			</ExpandInfo>

			<Sort />

			<CustomCarousel
				children={VioletButton}
				elementsView={7}
				elementsMove={2}
				data={yearCarouselData}
				arrowSize={16}
				classNameWrapper={style.carousel_wrapper}
				space={12}
			/>

			<FilterBlock />
		</PageLayout>
	)
}

export default MoviesPage
