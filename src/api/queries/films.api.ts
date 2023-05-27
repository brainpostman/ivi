import {
  IFilmByIdGetResponse,
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
  IMovieById,
} from '@/types/api/films.api.interface'
import {
  transformFilmById,
  transformFilms,
} from '../transforms/films.transform'
import { customAxios } from './customAxios'
import formatStrToNum from '@/formatters/strToNum.format'
import { ICRUDFilm } from '@/types/api/ICrudMovie'

interface IGetFilms {
  films: IMovie[]
  totalCount: number
  minYear: number
  maxYear: number
  minCountScore: number
  maxCountScore: number
  maxRating: number
}

interface IGetCrudFilms extends Omit<IGetFilms, 'films'> {
  films: ICRUDFilm[]
}

export const filmsAPI = {
  getFilms(locale: string, params?: IFilmsGetRequest) {
    return getFilms(locale, params)
  },
  getCrudFilms(params?: IFilmsGetRequest) {
    return getCrudFilms(params)
  },
  getFilmsById(locale: string, param: number) {
    return getFilmsById(locale, param)
  },
}

/*
  * Получаем фильмы

  * @param {locale} string - локаль
  * @param {IFilmsGetRequest} params - параметры
  * @returns Promise<IGetFilms>

*/

const getFilms = async (
  locale: string,
  params?: IFilmsGetRequest
): Promise<IGetFilms> => {
  try {
    const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
      params,
    })

    const films = transformFilms(filmsData.data, locale)

    let totalCount = films.length
    let minYear = 0
    let maxYear = 0
    let minCountScore = 0
    let maxCountScore = 0
    let maxRating = 0

    if (typeof window === 'undefined') {
      totalCount = formatStrToNum(filmsData.headers['x-total-count'])
      minYear = formatStrToNum(filmsData.headers['x-min-year'])
      maxYear = formatStrToNum(filmsData.headers['x-max-year'])
      maxRating = formatStrToNum(filmsData.headers['x-max-rating'])

      minCountScore = formatStrToNum(filmsData.headers['x-min-count-score'])
      maxCountScore = formatStrToNum(filmsData.headers['x-max-count-score'])
    }

    return {
      films,
      totalCount,
      minYear,
      maxYear,
      minCountScore,
      maxCountScore,
      maxRating,
    }
  } catch (_) {
    return {
      films: [],
      totalCount: 0,
      minYear: 0,
      maxYear: 0,
      minCountScore: 0,
      maxCountScore: 0,
      maxRating: 0,
    }
  }
}

/*
  * Получаем круд фильмов

  * @param {IFilmsGetRequest} params - параметры
  * @returns Promise<IGetCrudFilms>

*/

const getCrudFilms = async (
  params?: IFilmsGetRequest
): Promise<IGetCrudFilms> => {
  try {
    const response = await customAxios.get<ICRUDFilm[]>('/films', {
      params,
    })
    const totalCount = formatStrToNum(response.headers['x-total-count'])

    const minYear = formatStrToNum(response.headers['x-min-year'])
    const maxYear = formatStrToNum(response.headers['x-max-year'])

    const maxRating = formatStrToNum(response.headers['x-max-rating'])

    const minCountScore = formatStrToNum(response.headers['x-min-count-score'])
    const maxCountScore = formatStrToNum(response.headers['x-max-count-score'])

    return {
      films: response.data,
      totalCount,
      maxCountScore,
      maxYear,
      minCountScore,
      minYear,
      maxRating,
    }
  } catch (_) {
    return {
      films: [],
      totalCount: 0,
      maxCountScore: 0,
      maxYear: 0,
      minCountScore: 0,
      minYear: 0,
      maxRating: 0,
    }
  }
}

/*
  * Получаем фильм по id

  * @param {locale} string - локаль
  * @param {number} id - id фильма
  * @returns Promise<IMovieById | undefined>

*/

const getFilmsById = async (
  locale = 'ru',
  id: number
): Promise<IMovieById | undefined> => {
  try {
    const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`)
    const film = transformFilmById(filmData.data, locale)
    return film
  } catch (_) {
    return undefined
  }
}
