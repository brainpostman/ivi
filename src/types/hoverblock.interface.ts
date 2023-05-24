import { IFilterHeader } from './api/filters.api.interface'
import { IHeaderTab } from './header.interface'

export interface IHeaderHoverBlockContent {
  tab: IHeaderTab
  columns: {
    title?: string
    filter?: IFilterHeader
    href?: string
    rows: { id: number; href?: string; name: string }[]
  }[]
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
