import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { Dispatch, SetStateAction } from 'react'

/*
  * @param {IFilterBlockEl[]} filters - фильтры
  * @param {IFilterTitle} title - название фильтра
  * @returns IFilterBlockEl | undefined

*/

const getFilter = (
  filters: IFilterBlockEl[],
  title: IFilterTitle
): IFilterBlockEl | undefined => {
  const currentFilter = filters.find(filter => filter.title === title)

  if (!currentFilter) {
    console.error('Фильтр не найден')
    return
  }

  return currentFilter
}

/*
  * @param {Dispatch<SetStateAction<IFilterBlockEl[]>>} setFilters - функция 
    для изменения фильтра
  * @param {IFilterTitle} title - название фильтра

*/

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

/*
  * @param {IFilterBlockEl[]} filters - фильтры
  * @param {Dispatch<SetStateAction<IFilterBlockEl[]>>} setFilters - функция 
    для изменения фильтра
  * @returns (title: IFilterTitle) => () => IGetFilterFuncs

*/

interface IGetFilterFuncs {
  filter: IFilterBlockEl | undefined
  selectFilter: () => void
}

export const getFilterFuncs =
  (
    filters: IFilterBlockEl[],
    setFilters: Dispatch<SetStateAction<IFilterBlockEl[]>>
  ) =>
  (title: IFilterTitle): IGetFilterFuncs => {
    const filter = getFilter(filters, title)
    const selectFilter = getSelectFilterFunc(setFilters, title)

    return { filter, selectFilter }
  }
