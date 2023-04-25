import { FC } from 'react'

export type IFilterTitle =
  | 'Жанры'
  | 'Страны'
  | 'Годы'
  | 'Рейтинг Иви'
  | 'Режиссёр'
  | 'Актёр'

export interface IFilterBlockEl {
  title: IFilterTitle
  isExpand: boolean
}

export interface IFilterListEl {
  title: string
  param: string
  isSelect: boolean
}

export interface IFilterData {
  filter: IFilterBlockEl | undefined
  selectFilter: () => void
}

export interface IFilterListBigProps {
  filterData: IFilterData
  carouselData: any[]
  list: Omit<IFilterListEl, 'isSelect'>[]
  carouselContent: FC<any>
  carouselElementsView?: number
  carouselElementsMove?: number
  query: string
}

export interface IFilterListSmallProps {
  filterData: IFilterData
  list: Omit<IFilterListEl, 'isSelect'>[]
  query: string
}

export interface IFilterSuggestProps {
  filterData: IFilterData
  closeModal: () => void
  suggestList: string[]
  placeholder?: string
  query: string
}

export interface IFilterSliderProps {
  title: string
  query: string
  minValue: number
  maxValue: number
}
