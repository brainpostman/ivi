import FilterGenreCarouselContent from '@/components/CarouselContents/FilterGenreCarouselContent/FilterGenreCarouselContent'
import FilterListBig from '@/components/FilterBlock/FilterListBig/FilterListBig'
import { useFilter } from '@/hooks/useFilter'
import {
  IFilterBlockEl,
  IFilterListBigProps,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { FC } from 'react'

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [
  { title: 'Жанры' },
  { title: 'Страны' },
]

const FilterListBigWrapper: FC<
  Omit<IFilterListBigProps, 'filterData'> & {
    title: IFilterTitle
  }
> = ({ title, ...props }) => {
  const { getFilterData } = useFilter(filterList)
  const filterData = getFilterData(title)

  return <FilterListBig filterData={filterData} {...props} />
}

export default FilterListBigWrapper
