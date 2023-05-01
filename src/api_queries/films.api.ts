import {
  IFilmsGetRequest,
  IFilmsgGetResponse,
  IMovie,
} from '@/types/films.api.interface'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getFilms = async (
  params?: IFilmsGetRequest
): Promise<IMovie[]> => {
  console.log('REQUEST: GET FILMS')
  const films = await axios
    .get<IFilmsgGetResponse[]>('http://188.120.248.77:3000/films', { params })
    .then(resp =>
      resp.data.map(resp => ({
        ...resp,
        countries: resp.countries.map(country => country.name).join(','),
        genres: resp.genres.map(genre => genre.name).join(','),
        directors: resp.directors.map(genre => genre.name).join(','),
      }))
    )
    .catch(() => {
      toast.error('Ошибка!')
      return []
    })

  return films
}
