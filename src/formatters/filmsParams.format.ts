import { IFilmsGetRequest } from '@/types/films.api.interface'
import { formatCapitalize } from './capitalize.format'
import { ParsedUrlQuery } from 'querystring'

export const formatFilmsParams = (queryParams: ParsedUrlQuery | undefined) => {
  if (!queryParams) return {}

  const currentParams: IFilmsGetRequest = { take: 14, page: 1 }
  const genres = queryParams.genres as string
  if (genres) {
    currentParams.genres = genres
      .split(',')
      .map(genre => formatCapitalize(genre, { reverse: true }))
  }

  const countries = queryParams.country as string
  if (countries) {
    currentParams.countries = countries.split(',')
  }

  return currentParams
}
