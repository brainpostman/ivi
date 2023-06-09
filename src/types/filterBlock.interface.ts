import { IQuerySuggest } from './api/staffs.api.interface'
import { IQueryRange, IRangeWithPartial } from './utils.interface'

export type IFilterTitle =
  | 'genres'
  | 'genres_en'
  | 'countries'
  | 'fk_countries'
  | 'rating'
  | 'director'
  | 'actor'
  | string

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
  list: { id: number; name: string }[]
  carouselElementsView?: number
  carouselElementsMove?: number
  query: string
  enQuery: string
  children?: React.ReactNode[]
}

export interface IFilterListSmallProps {
  filterData: IFilterData
  list: { id: number; name: string; view: string }[]
  query: string
}

export interface IFilterSuggestProps {
  filterData: IFilterData
  closeModal: () => void
  suggestList: string[]
  placeholder?: string
  query: IQuerySuggest
}

export interface IFilterSliderProps {
  title: string
  query: string | IQueryRange
  range: IRangeWithPartial
  step?: number
}

export interface ISortType {
  id: number
  name: string
  view: string
}
