import { IHeaderFilter } from './header.interface'

export interface IHeaderHoverBlockContent {
	filter: IHeaderFilter
	columns: { title?: string; rows: string[] }[]
}

export interface IHeaderChannels {
	title: string
	channels: {
		img: string
		href: string
	}[]
}

export interface IHeaderBroadCast {
	title: string
	img: string
	date: string
	category: string
	href: string
}
