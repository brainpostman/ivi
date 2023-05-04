import {
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
} from '@/types/films.api.interface'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getFilms = (
  params?: IFilmsGetRequest
): Promise<{ films: IMovie[]; totalCount: number }> => {
  const data = axios
    .get<IFilmsgGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/films`,
      {
        params,
      }
    )
    .then(resp => {
      const totalCount = Number(resp.headers['X-Total-count'])
      const films = resp.data.map(resp => ({
        ...resp,
        countries: resp.countries.map(country => country.name).join(','),
        genres: resp.genres.map(genre => genre.name).join(','),
        directors: resp.directors.map(genre => genre.name).join(','),
      }))

      return { films, totalCount }
    })
    .catch(() => {
      toast.error('Ошибка при получении фильмов!')
      return { films: [], totalCount: 0 }
    })

  return data
}
