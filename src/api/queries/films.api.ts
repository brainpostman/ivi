import {
    IFilmByIdGetResponse,
    IFilmsGetRequest,
    IFilmsgGetResponse,
    IMovie,
    IMovieById,
    IReviewGetResponse,
    IReviewPostRequest,
} from '@/types/films.api.interface';
import { transformFilmById, transformFilms } from '../transforms/films.transform';
import { customAxios } from './customAxios';
import { ICRUDFilm } from '@/types/ICrudMovie';
import formatStrToNum from '@/formatters/strToNum.format';

interface IGetFilms {
    films: IMovie[];
    totalCount: number;
    minYear: number;
    maxYear: number;
    minCountScore: number;
    maxCountScore: number;
}

interface IGetCrudFilms extends Omit<IGetFilms, 'films'> {
    films: ICRUDFilm[];
}

export const filmsAPI = {
    getFilms(locale?: string, params?: IFilmsGetRequest) {
        return getFilms(locale, params);
    },
    getCrudFilms(params?: IFilmsGetRequest) {
        return getCrudFilms(params);
    },
    getFilmsById(param: number, locale: string) {
        return getFilmsById(param, locale);
    },
    getFilmReviewCount(param: number) {
        return getFilmReviewCount(param);
    },
    getFilmReviews(param: number) {
        return getFilmReviews(param);
    },
    getFilmReviewById(param: number) {
        return getFilmReviewById(param);
    },
    getComments(film_id: number, parent_id: number) {
        return getComments(film_id, parent_id);
    },
    postFilmReview(data: IReviewPostRequest, accessToken: string | null) {
        return postFilmReview(data, accessToken);
    },
    putFilmReview(data: { id: number; text: string }, accessToken: string | null) {
        return putFilmReview(data, accessToken);
    },
};

const getFilms = async (locale?: string, params?: IFilmsGetRequest): Promise<IGetFilms> => {
    try {
        const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
            params,
        });

        const films = transformFilms(filmsData.data, locale);

        let totalCount = films.length;
        let minYear = 0;
        let maxYear = 0;
        let minCountScore = 0;
        let maxCountScore = 0;

        if (typeof window === 'undefined') {
            totalCount = formatStrToNum(filmsData.headers['x-total-count']);
            minYear = formatStrToNum(filmsData.headers['x-min-year']);
            maxYear = formatStrToNum(filmsData.headers['x-max-year']);

            minCountScore = formatStrToNum(filmsData.headers['x-min-count-score']);
            maxCountScore = formatStrToNum(filmsData.headers['x-max-count-score']);
        }

        return {
            films,
            totalCount,
            minYear,
            maxYear,
            minCountScore,
            maxCountScore,
        };
    } catch (_) {
        return {
            films: [],
            totalCount: 0,
            minYear: 0,
            maxYear: 0,
            minCountScore: 0,
            maxCountScore: 0,
        };
    }
};

const getCrudFilms = async (params?: IFilmsGetRequest): Promise<IGetCrudFilms> => {
    try {
        const response = await customAxios.get<ICRUDFilm[]>('/films', {
            params,
        });
        const totalCount = formatStrToNum(response.headers['x-total-count']);

        const minYear = formatStrToNum(response.headers['x-min-year']);
        const maxYear = formatStrToNum(response.headers['x-max-year']);

        const minCountScore = formatStrToNum(response.headers['x-min-count-score']);
        const maxCountScore = formatStrToNum(response.headers['x-max-count-score']);

        return {
            films: response.data,
            totalCount,
            maxCountScore,
            maxYear,
            minCountScore,
            minYear,
        };
    } catch (_) {
        return {
            films: [],
            totalCount: 0,
            maxCountScore: 0,
            maxYear: 0,
            minCountScore: 0,
            minYear: 0,
        };
    }
};

const getFilmsById = async (id: number, locale = 'ru'): Promise<IMovieById | undefined> => {
    try {
        const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`);
        const film = transformFilmById(filmData.data, locale);
        return film;
    } catch (_) {
        return undefined;
    }
};

const getFilmReviewCount = async (id: number): Promise<number> => {
    try {
        const response = await customAxios.get<number>(`/reviews/count/${id}`);
        return response.data;
    } catch (_) {
        return 0;
    }
};

const getFilmReviews = async (id: number): Promise<IReviewGetResponse[]> => {
    try {
        const response = await customAxios.get<IReviewGetResponse[]>(`/reviews/parents/${id}`);
        return response.data;
    } catch (_) {
        return [];
    }
};

const getComments = async (film_id: number, parent_id: number) => {
    try {
        const response = await customAxios.get<IReviewGetResponse[]>(
            `/reviews/film/${film_id}/${parent_id}`
        );
        return response.data;
    } catch (_) {
        return [];
    }
};

const getFilmReviewById = async (id: number): Promise<IReviewGetResponse | null> => {
    try {
        const response = await customAxios.get<IReviewGetResponse>(`/reviews/${id}`);
        return response.data;
    } catch (_) {
        return null;
    }
};

const postFilmReview = async (
    data: IReviewPostRequest,
    accessToken: string | null
): Promise<IReviewGetResponse | null> => {
    try {
        const response = await customAxios.post<IReviewGetResponse>(`/reviews`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (_) {
        return null;
    }
};

const putFilmReview = async (
    data: { id: number; text: string },
    accessToken: string | null
): Promise<IReviewGetResponse | null> => {
    try {
        const response = await customAxios.put<IReviewGetResponse>(`/reviews`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (_) {
        return null;
    }
};
