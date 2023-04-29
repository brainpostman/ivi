export type IFilterTitle = 'genre' | 'country' | 'year' | 'rating' | 'director' | 'actor' | string;

export interface IFilterBlockEl {
    title: IFilterTitle;
    isExpand: boolean;
}

export interface IFilterListEl {
    title: string;
    param: string;
    isSelect: boolean;
}

export interface IFilterData {
    filter: IFilterBlockEl | undefined;
    selectFilter: () => void;
}

export interface IFilterListBigProps {
    filterData: IFilterData;
    list: Omit<IFilterListEl, 'isSelect'>[];
    carouselElementsView?: number;
    carouselElementsMove?: number;
    query: string;
    children?: React.ReactNode[];
}

export interface IFilterListSmallProps {
    filterData: IFilterData;
    list: Omit<IFilterListEl, 'isSelect'>[];
    query: string;
}

export interface IFilterSuggestProps {
    filterData: IFilterData;
    closeModal: () => void;
    suggestList: string[];
    placeholder?: string;
    query: string;
}

export interface IFilterSliderProps {
    title: string;
    query: string;
    minValue: number;
    maxValue: number;
}
