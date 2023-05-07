import FilterSuggest from '@/components/FilterBlock/FilterSuggest/FilterSuggest'
import { useFilter } from '@/hooks/useFilter'
import {
  IFilterBlockEl,
  IFilterSuggestProps,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { FC } from 'react'

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [
  { title: 'Режиссёр' },
  { title: 'Актёр' },
]

const FilterSuggestWrapper: FC<
  Omit<IFilterSuggestProps, 'filterData' | 'closeModal' | 'suggestList'> & {
    title: IFilterTitle
    stringedSuggestList: string
  }
> = ({ title, stringedSuggestList, ...props }) => {
  const { expandTabFilter, getFilterData } = useFilter(filterList)
  const filterData = getFilterData(title)

  const suggestList = stringedSuggestList
    .split(',')
    .map((el, index) => ({ id: index, name: el }))

  return (
    <FilterSuggest
      filterData={filterData}
      closeModal={expandTabFilter(title)}
      suggestList={suggestList}
      {...props}
    />
  )
}

export default FilterSuggestWrapper
