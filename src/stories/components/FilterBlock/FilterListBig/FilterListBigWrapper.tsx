import FilterListBig from '@/components/FilterBlock/FilterListBig/FilterListBig'
import FilterGenreCard from '@/components/FilterGenreCard/FilterGenreCard'
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
    children: React.ReactNode[]
  }
> = ({ title, children, ...props }) => {
  const { getFilterData } = useFilter(filterList)
  const filterData = getFilterData(title)

  return (
    <div style={{ width: 250 }}>
      <FilterListBig filterData={filterData} {...props}>
        {children}
      </FilterListBig>
    </div>
  )
}

export default FilterListBigWrapper
