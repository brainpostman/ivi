import {
    IFilmByIdGetResponse,
    IFilmsGetRequest,
    IFilmsgGetResponse,
    IMovie,
    IMovieById,
    IReviewGetResponse,
    IReviewPostRequest,
} from '@/types/films.api.interface';
import { transformFilms } from '../transforms/films.transform';
import { customAxios } from './customAxios';
import { ICRUDFilm } from '@/types/ICrudMovie';

export const filmsAPI = {
    getFilms(params?: IFilmsGetRequest) {
        return getFilms(params);
    },
    getFilmsHomePage(params?: { page?: number }) {
        return getFilms({ take: 19, page: params?.page || 1 });
    },
    getCrudFilms(params?: IFilmsGetRequest) {
        return getCrudFilms(params);
    },
    getFilmsById(param: number) {
        return getFilmsById(param);
    },
    getFilmReviewCount(param: number) {
        return getFilmReviewCount(param);
    },
    getFilmReviews(param: number) {
        return getFilmReviews(param);
    },
    postFilmReview(data: IReviewPostRequest, accessToken: string | null) {
        return postFilmReview(data, accessToken);
    },
};

const getFilms = async (
    params?: IFilmsGetRequest
): Promise<{ films: IMovie[]; totalCount: number }> => {
    try {
        const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
            params,
        });

        const films = filmsData.data.map((film) => transformFilms(film));

        const totalCount = filmsData.headers['x-total-count'];
        return { films, totalCount: totalCount || 0 };
    } catch (_) {
        return { films: [], totalCount: 0 };
    }
};

const getCrudFilms = async (
    params?: IFilmsGetRequest
): Promise<{ films: ICRUDFilm[]; totalCount: number }> => {
    try {
        const response = await customAxios.get<ICRUDFilm[]>('/films', {
            params,
        });
        const totalCount = response.headers['x-total-count'];
        return { films: response.data, totalCount: totalCount || 0 };
    } catch (_) {
        return { films: [], totalCount: 0 };
    }
};

const getFilmsById = async (id: number): Promise<IMovieById | undefined> => {
    try {
        const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`);
        const film = transformFilms(filmData.data);

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
