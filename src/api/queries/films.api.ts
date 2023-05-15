import {
    IFilmByIdGetResponse,
    IFilmsGetRequest,
    IFilmsgGetResponse,
    IMovie,
    IMovieById,
} from '@/types/films.api.interface';
import { transformFilms } from '../transforms/films.transform';
import { customAxios } from './customAxios';
import { CrudFilm, ICrudFilm, ICRUDMovie } from '@/types/ICrudMovie';

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
): Promise<{ films: ICRUDMovie[]; totalCount: number }> => {
    try {
        const response = await customAxios.get<ICRUDMovie[]>('/films', {
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
