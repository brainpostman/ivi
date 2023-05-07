import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { Dispatch, SetStateAction } from 'react'

const getFilter = (filters: IFilterBlockEl[], title: IFilterTitle) => {
  const currentFilter = filters.find(filter => filter.title === title)

  if (!currentFilter) {
    console.error('Фильтр не найден')
    return
  }

  return currentFilter
}

const getSelectFilterFunc =
  (
    setFilters: Dispatch<SetStateAction<IFilterBlockEl[]>>,
    title: IFilterTitle
  ) =>
  () => {
    setFilters(prev => {
      const copy = [...prev].map(filter => ({
        ...filter,
        isExpand: filter.title === title ? !filter.isExpand : false,
      }))

      return copy
    })
  }

export const getFilterFuncs =
  (
    filters: IFilterBlockEl[],
    setFilters: Dispatch<SetStateAction<IFilterBlockEl[]>>
  ) =>
  (title: IFilterTitle) => {
    const filter = getFilter(filters, title)
    const selectFilter = getSelectFilterFunc(setFilters, title)

    return { filter, selectFilter }
  }
