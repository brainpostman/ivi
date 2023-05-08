import {
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
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
    const totalCount = await filmsData.headers['x-total-count']

    console.log(filmsData.data)

    return { films, totalCount }
  } catch (error) {
    toast.error('Ошибка при получении фильмов')
    return { films: [], totalCount: 0 }
  }
}

const getFilmsById = async (id: number): Promise<IMovie | undefined> => {
  try {
    const filmData = await customAxios.get<IFilmsgGetResponse>(`/films/${id}`)

    const film = transformFilms(filmData.data)

    return film
  } catch (error) {
    toast.error('Ошибка при получении фильма')
    return undefined
  }
}
