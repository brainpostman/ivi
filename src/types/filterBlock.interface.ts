import { IStaffGetResponse } from './staffs.interface'

export type IFilterTitle = 'genres' | 'country' | 'year' | 'rating' | 'director' | 'actor' | string;

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
  filterData: IFilterData
  list: { id: number; name: string }[]
  carouselElementsView?: number
  carouselElementsMove?: number
  query: string
  children?: React.ReactNode[]
}

export interface IFilterListSmallProps {
  filterData: IFilterData
  list: { id: number; name: string; view: string }[]
  query: string
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
    range?: {
        min: number;
        max: number;
    };
    maxValue?: number;
}

export interface ISortType {
    id: number;
    name: string;
    view: string;
}
