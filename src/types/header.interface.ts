export type IHeaderTab =
	| 'films'
	| 'series'
	| 'cartoons'
	| 'TV+'
	| 'profile'
	| undefined

export interface IHeaderBlock {
	isShow: boolean
	tab: IHeaderTab
}
