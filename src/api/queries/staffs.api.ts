import { formatCapitalize } from '@/formatters/capitalize.format'
import {
  IFilterGetResponse,
  IStaff,
  IStaffGetRequest,
  IStaffGetResponse,
} from '@/types/staffs.interface'
import { transformStaff } from '../transforms/staff.transform'
import { customAxios } from './customAxios'
import { ICrudGenre } from '@/types/ICrudMovie'
import { displayErrorsServer } from '@/utils/error.util'

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
  getStaffById(id: number) {
    return getStaffById(id)
  },
}

const getGenres = async (
  locale: string,
  params?: IStaffGetRequest
): Promise<IFilterGetResponse[]> => {
  const genresData = await customAxios.get<IStaffGetResponse[]>('/genres', {
    params,
  })

  const genres = genresData.data.map(genre => {
    const name = genre.name_en && locale !== 'ru' ? genre.name_en : genre.name
    return { ...genre, name: formatCapitalize(name) }
  })

  return genres
}

const getCrudGenres = async (
  params?: IStaffGetRequest
): Promise<ICrudGenre[]> => {
  const response = await customAxios.get<ICrudGenre[]>('/genres', {
    params,
  })
  return response.data
}

const getCountries = async (): Promise<IFilterGetResponse[]> => {
  const countriesData = await customAxios.get<IFilterGetResponse[]>(
    '/countries'
  )

  const countries = countriesData.data

  return countries
}

const getDirectors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  const directorsData = await customAxios.get<IStaffGetResponse[]>('/staffs', {
    params: {
      type: 'director',
      ...params,
    },
  })

  const directors = directorsData.data.map(director => transformStaff(director))
  return directors
}

const getActors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  const actorsData = await customAxios.get<IStaffGetResponse[]>('/staffs', {
    params: {
      type: 'actor',
      ...params,
    },
  })

  const actors = actorsData.data.map(actor => transformStaff(actor))

  return actors
}

const getStaffById = async (id: number): Promise<IStaff | undefined> => {
  const staff = (await customAxios.get(`/staffs/${id}`)).data
  const formattedStaff = transformStaff(staff)

  return formattedStaff
}
