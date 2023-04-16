export type IHeaderFilter =
	| 'films'
	| 'series'
	| 'cartoons'
	| 'TV+'
	| 'profile'
	| undefined

export interface IHeaderBlock {
	isShow: boolean
	filter: IHeaderFilter
}
