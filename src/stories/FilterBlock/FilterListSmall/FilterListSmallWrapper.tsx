import FilterListSmall from '@/components/FilterBlock/FilterListSmall/FilterListSmall'
import { useFilter } from '@/hooks/useFilter'
import {
  IFilterBlockEl,
  IFilterListSmallProps,
} from '@/types/filterBlock.interface'
import { FC } from 'react'

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [{ title: 'Годы' }]

const FilterListSmallWrapper: FC<
  Omit<IFilterListSmallProps, 'list' | 'filterData'> & {
    unformattedStringedList: string
  }
> = ({ unformattedStringedList, ...props }) => {
  const { getFilterData } = useFilter(filterList)
  const filterData = getFilterData('Годы')

  const list = unformattedStringedList?.split(',').map((el, index) => ({
    title: el,
    param: index === 0 ? 'all' : `year${index + 1}`,
  }))

  return (
    <div style={{ display: 'flex' }}>
      <FilterListSmall list={list} filterData={filterData} {...props} />
    </div>
  )
}

export default FilterListSmallWrapper
