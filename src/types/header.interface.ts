export type IHeaderTab =
    | 'movies'
    | 'series'
    | 'cartoons'
    | 'TV+'
    | 'profile'
    | 'watch'
    | string
    | undefined;

export interface IHeaderBlock {
    isShow: boolean;
    tab: IHeaderTab;
}
