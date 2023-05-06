import { formatCapitalize } from '@/formatters/capitalize.format'
import { IFilterGetResponse } from '@/types/filters.api.interface'
import { toast } from 'react-toastify'
import { transformFilter } from '../transforms/filter.transform'
import { customAxios } from './customAxios'

export const filtersAPI = {
  getGenres() {
    return getGenres()
  },
  getCountries() {
    return getCountries()
  },
  getDirectors() {
    return getDirectors()
  },
  getActors() {
    return getActors()
  },
}

const getGenres = async (): Promise<IFilterGetResponse[]> => {
  try {
    const genresData = await customAxios.get<IFilterGetResponse[]>('/genres')

    const genres = genresData.data.map(genre =>
      transformFilter(genre, formatCapitalize)
    )
    return genres
  } catch (error) {
    toast.error('Ошибка при получении жанров!')
    return []
  }
}

const getCountries = async (): Promise<IFilterGetResponse[]> => {
  try {
    const countriesData = await customAxios.get<IFilterGetResponse[]>(
      '/countries'
    )

    const countries = countriesData.data.map(country =>
      transformFilter(country)
    )

    return countries
  } catch (error) {
    toast.error('Ошибка при получении стран!')
    return []
  }
}

const getDirectors = async (): Promise<IFilterGetResponse[]> => {
  try {
    const directorsData = await customAxios.get<IFilterGetResponse[]>(
      '/staffs?type=director'
    )

    const directors = directorsData.data.map(director =>
      transformFilter(director)
    )
    return directors
  } catch (error) {
    toast.error('Ошибка при получении режиссёров!')
    return []
  }
}

const getActors = async (): Promise<IFilterGetResponse[]> => {
  try {
    const actorsData = await customAxios.get<IFilterGetResponse[]>(
      '/staffs?type=actor'
    )

    const actors = actorsData.data.map(actor => transformFilter(actor))

    return actors
  } catch (error) {
    toast.error('Ошибка при получении режиссёров!')
    return []
  }
}
