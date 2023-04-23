export type IFilterTitle =
  | 'Жанры'
  | 'Страны'
  | 'Годы'
  | 'Рейтинг Иви'
  | 'Режиссёр'
  | 'Актёр'

export interface IFilterBlockEl {
  title: IFilterTitle
  isExpand?: boolean
}

export interface IFilterListEl {
  title: string
  param: string
  isSelect: boolean
}
