import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import { IFilterListEl, IFilterTitle } from '@/types/filterBlock.interface'
import { FC } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListBig.module.scss'

interface IProps {
	title: IFilterTitle
	selectFilter: () => void
	filter?: IFilterListEl
	carouselData: any[]
	list: string[]
	carouselContent: FC<any>
	carouselElementsView?: number
	carouselElementsMove?: number
}

const FilterListBig: FC<IProps> = ({
	title,
	selectFilter,
	filter,
	carouselData,
	list,
	carouselContent,
	carouselElementsView = 5,
	carouselElementsMove = 2,
}) => {
	return (
		<FilterTab title={title} selectFilter={selectFilter} filter={filter}>
			{filter?.isExpand && (
				<div className={style.container}>
					<CustomCarousel
						children={carouselContent}
						elementsMove={carouselElementsMove}
						elementsView={carouselElementsView}
						arrowSize={18}
						space={12}
						data={carouselData}
						classNameWrapper={style.carousel_wrapper}
						width='fit'
					/>

					<ul className={style.list}>
						{list.map(genre => (
							<li key={genre}>
								<p>{genre}</p>
								<BsCheckLg />
							</li>
						))}
					</ul>
				</div>
			)}
		</FilterTab>
	)
}

export default FilterListBig
