import { IFilterGetResponse } from '@/types/filters.interface'
import { IStaffGetRequest, IStaffGetResponse } from '@/types/staffs.interface'
import { customAxios } from './customAxios'
import { formatCapitalize } from '@/formatters/capitalize.format'
import { IFilmsGetRequest } from '@/types/films.api.interface'
import { ICRUDGenre } from '@/types/ICrudMovie'

export const filtersAPI = {
  getGenres(locale: string, params?: IStaffGetRequest) {
    return getGenres(locale, params)
  },
  getCrudGenres(params?: IFilmsGetRequest) {
    return getCrudGenres(params)
  },
  getCountries() {
    return getCountries()
  },
}

const getGenres = async (
  locale: string,
  params?: IStaffGetRequest
): Promise<IFilterGetResponse[]> => {
  try {
    const genresData = await customAxios.get<IStaffGetResponse[]>('/genres', {
      params,
    })
    const genres =
      locale === 'ru'
        ? genresData.data.map(genre => ({
            ...genre,
            name: formatCapitalize(genre.name),
          }))
        : genresData.data
            .filter(genre => genre.name_en)
            .map(genre => ({
              ...genre,
              name: formatCapitalize(genre.name_en ?? ''),
            }))

    return genres
  } catch (_) {
    return []
  }
}

const getCrudGenres = async (
  params?: IFilmsGetRequest
): Promise<ICRUDGenre[]> => {
  try {
    const crudGenresData = await customAxios.get<ICRUDGenre[]>('/genres', {
      params,
    })
    const crudGenres = crudGenresData.data

    return crudGenres
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
