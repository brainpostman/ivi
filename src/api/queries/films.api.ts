import {
  IFilmByIdGetResponse,
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
  IMovieById,
} from '@/types/films.api.interface'
import { transformFilms } from '../transforms/films.transform'
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
  getFilms(params?: IFilmsGetRequest) {
    return getFilms(params)
  },
  getCrudFilms(params?: IFilmsGetRequest) {
    return getCrudFilms(params)
  },
  getFilmsById(param: number) {
    return getFilmsById(param)
  },
}

const getFilms = async (params?: IFilmsGetRequest): Promise<IGetFilms> => {
  try {
    const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
      params,
    })

    const films = filmsData.data.map(film => transformFilms(film))

    const totalCount = formatStrToNum(filmsData.headers['x-total-count'])

    const minYear = formatStrToNum(filmsData.headers['x-min-year'])
    const maxYear = formatStrToNum(filmsData.headers['x-max-year'])

    const minCountScore = formatStrToNum(filmsData.headers['x-min-count-score'])
    const maxCountScore = formatStrToNum(filmsData.headers['x-max-count-score'])

    return {
      films,
      totalCount: totalCount,
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
  params?: IFilmsGetRequest
): Promise<IGetCrudFilms> => {
  try {
    const response = await customAxios.get<ICRUDMovie[]>('/films', {
      params,
    })

    const totalCount = formatStrToNum(response.headers['x-total-count'])

    const minYear = formatStrToNum(response.headers['x-min-year'])
    const maxYear = formatStrToNum(response.headers['x-max-year'])

    const minCountScore = formatStrToNum(response.headers['x-min-count-score'])
    const maxCountScore = formatStrToNum(response.headers['x-max-count-score'])

    return {
      films: response.data,
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

const getFilmsById = async (id: number): Promise<IMovieById | undefined> => {
  try {
    const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`)
    const film = transformFilms(filmData.data)

    return film
  } catch (_) {
    return undefined
  }
}
