import { getFilterFuncs } from '@/utils/filterBlock.util'
import {
  IFilterBlockEl,
  IFilterData,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { useState } from 'react'

/*
  * @param {(title: IFilterTitle) => () => void} expandTabFilter - функция для 
    сворачивания / разворачивания плашки с фильтром
  * @param {(title: IFilterTitle) => IFilterData} getFilterData - функция для получения данных фильтра

*/
interface IUseFilter {
  expandTabFilter: (title: IFilterTitle) => () => void
  getFilterData: (title: IFilterTitle) => IFilterData
}

type IDefaultValue = Omit<IFilterBlockEl, 'isExpand'>[]

/*
  * @param {IDefaultValue} defaultValue - фильтр по умолчанию
  * @returns IUseFilter

*/
export const useFilter = (defaultValue: IDefaultValue): IUseFilter => {
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
