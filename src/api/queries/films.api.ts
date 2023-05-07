import {
  IFilmsGetRequest,
  IFilmsgGetResponse,
} from '@/types/films.api.interface'
import { toast } from 'react-toastify'
import { transformFilms } from '../transforms/films.transform'
import { customAxios } from './customAxios'

export const filmsAPI = {
  getFilms(params?: IFilmsGetRequest) {
    return getFilms(params)
  },
  getFilmsHomePage(params?: { page?: number }) {
    return getFilms({ take: 19, page: params?.page || 1 })
  },
}

export const getFilms = async (params?: IFilmsGetRequest) => {
  try {
    const filmsData = await customAxios.get<IFilmsgGetResponse[]>('/films', {
      params,
    })

    const films = filmsData.data.map(film => transformFilms(film))
    const totalCount = await filmsData.headers['x-total-count']

    return { films, totalCount }
  } catch (error) {
    toast.error('Ошибка при получении фильмов')
    return { films: [], totalCount: 0 }
  }
}
