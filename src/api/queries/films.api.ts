import {
  IFilmByIdGetResponse,
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
  IMovieById,
} from '@/types/films.api.interface'
import {
  transformFilmById,
  transformFilms,
} from '../transforms/films.transform'
import { customAxios } from './customAxios'
import { ICRUDMovie } from '@/types/ICrudMovie'
import formatStrToNum from '@/formatters/strToNum.format'

interface IGetFilms {
  films: IMovie[]
  totalCount: number
  minYear: number
  maxYear: number
  minCountScore: number
  maxCountScore: number
}

interface IGetCrudFilms extends Omit<IGetFilms, 'films'> {
  films: ICRUDMovie[]
}

export const filmsAPI = {
  getFilms(locale?: string, params?: IFilmsGetRequest) {
    return getFilms(locale, params)
  },
  getCrudFilms(locale?: string, params?: IFilmsGetRequest) {
    return getCrudFilms(locale, params)
  },
  getFilmsById(param: number, locale: string) {
    return getFilmsById(param, locale)
  },
}

const getFilms = async (
  locale?: string,
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

    if (typeof window === 'undefined') {
      totalCount = formatStrToNum(filmsData.headers['x-total-count'])
      minYear = formatStrToNum(filmsData.headers['x-min-year'])
      maxYear = formatStrToNum(filmsData.headers['x-max-year'])

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
    }
  } catch (_) {
    return {
      films: [],
      totalCount: 0,
      minYear: 0,
      maxYear: 0,
      minCountScore: 0,
      maxCountScore: 0,
    }
  }
}

const getCrudFilms = async (
  locale: string = 'ru',
  params?: IFilmsGetRequest
): Promise<IGetCrudFilms> => {
  try {
    const response = await customAxios.get<ICRUDMovie[]>('/films', {
      params,
    })

    const films = response.data.map(film => {
      const name = locale === 'en' && film.name_en ? film.name_en : film.name
      return {
        ...film,
        name,
      }
    })

    const totalCount = formatStrToNum(response.headers['x-total-count'])

    const minYear = formatStrToNum(response.headers['x-min-year'])
    const maxYear = formatStrToNum(response.headers['x-max-year'])

    const minCountScore = formatStrToNum(response.headers['x-min-count-score'])
    const maxCountScore = formatStrToNum(response.headers['x-max-count-score'])

    return {
      films,
      totalCount,
      maxCountScore,
      maxYear,
      minCountScore,
      minYear,
    }
  } catch (_) {
    return {
      films: [],
      totalCount: 0,
      maxCountScore: 0,
      maxYear: 0,
      minCountScore: 0,
      minYear: 0,
    }
  }
}

const getFilmsById = async (
  id: number,
  locale: string = 'ru'
): Promise<IMovieById | undefined> => {
  try {
    const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`)
    const film = transformFilmById(filmData.data, locale)

    return film
  } catch (_) {
    return undefined
  }
}
