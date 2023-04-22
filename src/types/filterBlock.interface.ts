export type IFilterTitle =
	| 'Жанры'
	| 'Страны'
	| 'Годы'
	| 'Рейтинг Иви'
	| 'Режиссёр'
	| 'Актёр'

export interface IFilterListEl {
	title: IFilterTitle
	isExpand?: boolean
}
