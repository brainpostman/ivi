export type IHeaderTab =
  | 'movies'
  | 'series'
  | 'cartoons'
  | 'TV+'
  | 'profile'
  | 'watch'
  | undefined

export interface IHeaderBlock {
  isShow: boolean
  tab: IHeaderTab
}
