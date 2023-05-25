import { IStaffGetResponse } from './staffs.api.interface';
import { IFilterGetResponse } from './filters.api.interface';

export interface IFilmsGetRequest {
    order?: string;
    page?: number;
    take?: number;
    orderBy?: string;
    genres?: string[];
    genres_en?: string[];
    countries?: string[];
    actors?: string[];
    directors?: string[];
}

export interface IFilmByIdGetResponse extends IFilmsgGetResponse {
    directors: IStaffGetResponse[];
    artists: IStaffGetResponse[];
    actors: IStaffGetResponse[];
    montages: IStaffGetResponse[];
    compositors: IStaffGetResponse[];
    scenario: IStaffGetResponse[];
    operators: IStaffGetResponse[];
}

export interface IFilmsgGetResponse {
  id: number
  name: string
  name_en?: string
  year: number
  countries: IFilterGetResponse[]
  genres: { id: number; name: string; name_en: string | null }[]
  tagline: string
  scoreAVG: number
  countScore: number
  age: string
  description: string
  mainImg: string
  time: string
  premiereRU: string
  premiere?: string
}

export interface IMovie extends Omit<IFilmsgGetResponse, 'countries' | 'genres'> {
    countries: string;
    genres: string;
}

export interface IMovieById extends Omit<IFilmByIdGetResponse, 'countries' | 'genres'> {
    countries: string;
    genres: string;
}
