import { formatCapitalize } from '@/formatters/capitalize.format';
import { IFilterGetResponse } from '@/types/filters.api.interface';
import { toast } from 'react-toastify';
import { transformFilter } from '../transforms/filter.transform';
import { customAxios } from './customAxios';
import { ICrudGenre } from '@/types/ICrudMovie';
import { IFilmsGetRequest } from '@/types/films.api.interface';

export const filtersAPI = {
    getGenres(locale: string) {
        return getGenres(locale);
    },
    getCrudGenres(params?: IFilmsGetRequest) {
        return getCrudGenres(params);
    },
    getCountries() {
        return getCountries();
    },
    getDirectors() {
        return getDirectors();
    },
    getActors() {
        return getActors();
    },
};

const getGenres = async (locale: string): Promise<IFilterGetResponse[]> => {
    try {
        const genresData = await customAxios.get<IFilterGetResponse[]>('/genres');

        const genres =
            locale === 'ru'
                ? genresData.data.map((genre) => {
                      return transformFilter({ id: genre.id, name: genre.name }, formatCapitalize);
                  })
                : genresData.data
                      .filter((genre) => {
                          return genre.name_en;
                      })
                      .map((genre) => {
                          return transformFilter(
                              { id: genre.id, name: genre.name_en ?? '' },
                              formatCapitalize
                          );
                      });
        return genres;
    } catch (error) {
        toast.error('Ошибка при получении жанров!');
        return [];
    }
};

const getCrudGenres = async (params?: IFilmsGetRequest): Promise<ICrudGenre[]> => {
    try {
        const response = await customAxios.get<ICrudGenre[]>('/genres', {
            params,
        });
        return response.data;
    } catch (error: any) {
        toast.error('Ошибка при получении жанров!');
        return [];
    }
};

const getCountries = async (): Promise<IFilterGetResponse[]> => {
    try {
        const countriesData = await customAxios.get<IFilterGetResponse[]>('/countries');

        const countries = countriesData.data.map((country) => transformFilter(country));

        return countries;
    } catch (error) {
        toast.error('Ошибка при получении стран!');
        return [];
    }
};

const getDirectors = async (): Promise<IFilterGetResponse[]> => {
    try {
        const directorsData = await customAxios.get<IFilterGetResponse[]>('/staffs?type=director');

        const directors = directorsData.data.map((director) => transformFilter(director));
        return directors;
    } catch (error) {
        toast.error('Ошибка при получении режиссёров!');
        return [];
    }
};

const getActors = async (): Promise<IFilterGetResponse[]> => {
    try {
        const actorsData = await customAxios.get<IFilterGetResponse[]>('/staffs?type=actor');

        const actors = actorsData.data.map((actor) => transformFilter(actor));

        return actors;
    } catch (error) {
        toast.error('Ошибка при получении режиссёров!');
        return [];
    }
};
