import { IFilterGetResponse } from '@/types/filters.api.interface'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getGenres = (): Promise<IFilterGetResponse[]> => {
  const genres = axios
    .get<IFilterGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/genres`
    )
    .then(resp =>
      resp.data.map(genre => ({
        id: genre.id,
        name: genre.name,
      }))
    )
    .catch(() => {
      toast.error('Ошибка при получении жанров!')
      return []
    })

  return genres
}

export const getCountries = (): Promise<IFilterGetResponse[]> => {
  const countries = axios
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

export const getDirectors = (): Promise<IFilterGetResponse[]> => {
  const directors = axios
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

export const getActors = (): Promise<IFilterGetResponse[]> => {
  const actors = axios
    .get<IFilterGetResponse[]>(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/staffs?type=actor`
    )
    .then(resp => resp.data.map(actor => ({ id: actor.id, name: actor.name })))
    .catch(() => {
      toast.error('Ошибка получения режиссёров!')
      return []
    })

  return actors
}
