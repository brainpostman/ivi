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
  try {
    const genres = genresData.data.map(genre => {
      const name = genre.name_en && locale !== 'ru' ? genre.name_en : genre.name
      return { ...genre, name: formatCapitalize(name) }
    })

    return genres
  } catch (_) {
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
  } catch (_) {
    return []
  }
}

const getCountries = async (): Promise<IFilterGetResponse[]> => {
  try {
    const countriesData = await customAxios.get<IFilterGetResponse[]>(
      '/countries'
    )

    const countries = countriesData.data

    return countries
  } catch (_) {
    return []
  }
}

const getDirectors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  try {
    const directorsData = await customAxios.get<IStaffGetResponse[]>(
      '/staffs',
      {
        params: {
          type: 'director',
          ...params,
        },
      }
    )

    const directors = directorsData.data.map(director =>
      transformStaff(director)
    )
    return directors
  } catch (_) {
    return []
  }
}

const getActors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  try {
    const actorsData = await customAxios.get<IStaffGetResponse[]>('/staffs', {
      params: {
        type: 'actor',
        ...params,
      },
    })

    const actors = actorsData.data.map(actor => transformStaff(actor))

    return actors
  } catch (_) {
    return []
  }
}

const getStaffById = async (id: number): Promise<IStaff | undefined> => {
  try {
    const staff = (await customAxios.get(`/staffs/${id}`)).data
    const formattedStaff = transformStaff(staff)

    return formattedStaff
  } catch (_) {
    return undefined
  }
}
