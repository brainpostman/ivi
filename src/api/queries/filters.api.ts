import { IFilterGetResponse } from '@/types/api/filters.api.interface'
import { customAxios } from './customAxios'
import { formatCapitalize } from '@/formatters/capitalize.format'
import { ICRUDGenre } from '@/types/api/ICrudMovie'
import {
  IStaffGetRequest,
  IStaffGetResponse,
} from '@/types/api/staffs.api.interface'
import { IFilmsGetRequest } from '@/types/api/films.api.interface'

export const filtersAPI = {
  getGenres(locale?: string, params?: IStaffGetRequest) {
    return getGenres(locale, params)
  },
  getCrudGenres(params?: IFilmsGetRequest) {
    return getCrudGenres(params)
  },
  getCountries() {
    return getCountries()
  },
}

/*
  * Получаем жанры

  * @param {string} locale - локаль
  * @param {IStaffGetRequest} params - параметры
  * @returns Promise<IFilterGetResponse[]>

*/

const getGenres = async (
  locale = 'ru',
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
        : genresData.data.map(genre => {
            const name = genre.name_en || genre.name
            return {
              ...genre,
              name: formatCapitalize(name),
            }
          })

    return genres
  } catch (_) {
    return []
  }
}

/*
  * Получаем круд жанров

  * @param {IStaffGetRequest} params - параметры
  * @returns Promise<ICRUDGenre[]>

*/

const getCrudGenres = async (
  params?: IFilmsGetRequest
): Promise<ICRUDGenre[]> => {
  try {
    const crudGenresData = await customAxios.get<ICRUDGenre[]>('/genres', {
      params,
    })
    const crudGenres = crudGenresData.data

    if (!crudGenres) {
      console.error('Undefined crud genres')
      throw new Error('Undefined crud genres')
    }

    return crudGenres
  } catch (_) {
    return []
  }
}

/*
  * Получаем страны

  * @returns Promise<IFilterGetResponse[]>

*/

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
