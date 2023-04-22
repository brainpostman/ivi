export type IHeaderTab =
	| 'movies'
	| 'series'
	| 'cartoons'
	| 'TV+'
	| 'profile'
	| undefined

export interface IHeaderBlock {
	isShow: boolean
	tab: IHeaderTab
}
