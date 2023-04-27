import { getFilterFuncs } from '@/components/FilterBlock/utils/filterBlock.util'
import {
  IFilterBlockEl,
  IFilterData,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { useState } from 'react'

export const useFilter = (defaultValue: Omit<IFilterBlockEl, 'isExpand'>[]) => {
  const [filters, setFilters] = useState(
    defaultValue.map(el => ({ ...el, isExpand: false }))
  )
  const titles = defaultValue.map(el => el.title)

  const filterFuncs = getFilterFuncs(filters, setFilters)

  const filterDatas = titles.reduce((accum: IFilterData[], title) => {
    const { filter, selectFilter } = filterFuncs(title)
    const result = { filter, selectFilter }
    accum.push(result)
    return accum
  }, [])

  const expandTabFilter = (title: IFilterTitle) => () =>
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        isExpand: filter.title === title ? false : filter.isExpand,
      }))
    )

  const getFilterData = (title: IFilterTitle) =>
    filterDatas.find(func => func.filter?.title === title)!

  return { expandTabFilter, getFilterData }
}
