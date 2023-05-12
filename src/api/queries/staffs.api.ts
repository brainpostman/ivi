import { formatCapitalize } from '@/formatters/capitalize.format'
import {
  IFilterGetResponse,
  IStaffGetRequest,
  IStaffGetResponse,
} from '@/types/staffs.interface'
import { toast } from 'react-toastify'
import { transformFilter } from '../transforms/filter.transform'
import { customAxios } from './customAxios'
import { ICrudGenre } from '@/types/ICrudMovie'

export const staffsAPI = {
  getGenres(locale: string, params?: IStaffGetRequest) {
    return getGenres(locale, params)
  },
  getCrudGenres(params?: IStaffGetRequest) {
    return getCrudGenres(params)
  },
  getCountries() {
    return getCountries()
  },
  getDirectors(params?: IStaffGetRequest) {
    return getDirectors(params)
  },
  getActors(params?: IStaffGetRequest) {
    return getActors(params)
  },
}

const getGenres = async (
  locale: string,
  params?: IStaffGetRequest
): Promise<IStaffGetResponse[]> => {
  try {
    const genresData = await customAxios.get<IStaffGetResponse[]>('/genres', {
      params,
    })

    const genres = genresData.data.map(genre => {
      const name = genre.name_en && locale !== 'ru' ? genre.name_en : genre.name
      return transformFilter({ id: genre.id, name }, formatCapitalize)
    })
    return genres
  } catch (error: any) {
    toast.error(error)
    return []
  }
}

const getCrudGenres = async (
  params?: IStaffGetRequest
): Promise<ICrudGenre[]> => {
  try {
    const response = await customAxios.get<ICrudGenre[]>('/genres', {
      params,
    })
    return response.data
  } catch (error: any) {
    toast.error(error)
    return []
  }
}

const getCountries = async (): Promise<IStaffGetResponse[]> => {
  try {
    const countriesData = await customAxios.get<IFilterGetResponse[]>(
      '/countries'
    )

    const countries = countriesData.data.map(country =>
      transformFilter(country)
    )

    return countries
  } catch (error: any) {
    toast.error(error)
    return []
  }
}

const getDirectors = async (
  params?: IStaffGetRequest
): Promise<IStaffGetResponse[]> => {
  try {
    const directorsData = await customAxios.get<IStaffGetResponse[]>(
      '/staffs',
      {
        params: {
          type: 'actor',
          ...params,
        },
      }
    )

    const directors = directorsData.data.map(director =>
      transformFilter(director)
    )
    return directors
  } catch (error: any) {
    toast.error(error)
    return []
  }
}

const getActors = async (
  params?: IStaffGetRequest
): Promise<IStaffGetResponse[]> => {
  try {
    const actorsData = await customAxios.get<IStaffGetResponse[]>('/staffs', {
      params: {
        type: 'actor',
        ...params,
      },
    })

    const actors = actorsData.data.map(actor => transformFilter(actor))

    return actors
  } catch (error: any) {
    toast.error(error)
    return []
  }
}
