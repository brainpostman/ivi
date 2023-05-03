import { formatCapitalize } from '@/formatters/capitalize.format'
import { IFilterGetResponse } from '@/types/filters.api.interface'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getGenres = async (): Promise<IFilterGetResponse[]> => {
  const genres = await axios
    .get<IFilterGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/genres`
    )
    .then(resp =>
      resp.data.map(genre => ({
        id: genre.id,
        name: formatCapitalize(genre.name),
      }))
    )
    .catch(() => {
      toast.error('Ошибка при получении жанров!')
      return []
    })

  return genres
}

export const getCountries = async (): Promise<IFilterGetResponse[]> => {
  const countries = await axios
    .get<IFilterGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/countries`
    )
    .then(resp =>
      resp.data.map(country => ({ id: country.id, name: country.name }))
    )
    .catch(() => {
      toast.error('Ошибка при получении стран!')
      return []
    })

  return countries
}

export const getDirectors = async (): Promise<IFilterGetResponse[]> => {
  const directors = await axios
    .get<IFilterGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/staffs?type=director`
    )
    .then(resp =>
      resp.data.map(director => ({ id: director.id, name: director.name }))
    )
    .catch(() => {
      toast.error('Ошибка получения режиссёров!')
      return []
    })

  return directors
}
