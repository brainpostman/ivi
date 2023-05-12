import {
  IFilmByIdGetResponse,
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
  IMovieById,
} from '@/types/films.api.interface'
import { toast } from 'react-toastify'
import { transformFilms } from '../transforms/films.transform'
import { customAxios } from './customAxios'
import { CrudFilm, ICrudFilm, IFilmJson } from '@/types/ICrudMovie'

export const filmsAPI = {
  getFilms(params?: IFilmsGetRequest) {
    return getFilms(params)
  },
  getFilmsHomePage(params?: { page?: number }) {
    return getFilms({ take: 19, page: params?.page || 1 })
  },
  getCrudFilms(params?: IFilmsGetRequest) {
    return getCrudFilms(params)
  },
  getFilmsById(param: number) {
    return getFilmsById(param)
  },
}

const getFilms = async (
  params?: IFilmsGetRequest
): Promise<{ films: IMovie[]; totalCount: number }> => {
  try {
    const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
      params,
    })

    const films = filmsData.data.map(film => transformFilms(film))
    const totalCount = filmsData.headers['x-total-count']

    return { films, totalCount }
  } catch (error: any) {
    toast.error(error)
    return { films: [], totalCount: 0 }
  }
}

const getCrudFilms = async (
  params?: IFilmsGetRequest
): Promise<{ films: ICrudFilm[]; totalCount: number }> => {
  try {
    const response = await customAxios.get<IFilmJson[]>('/films', {
      params,
    })
    const films = response.data.map(film => {
      return new CrudFilm(film)
    })
    const totalCount = response.headers['x-total-count']
    return { films, totalCount }
  } catch (error: any) {
    toast.error(error)
    return { films: [], totalCount: 0 }
  }
}

const getFilmsById = async (id: number): Promise<IMovieById | undefined> => {
  try {
    const filmData = await customAxios.get<IFilmByIdGetResponse>(`/films/${id}`)

    const film = transformFilms(filmData.data)

    return film
  } catch (error: any) {
    toast.error(error)
    return undefined
  }
}
