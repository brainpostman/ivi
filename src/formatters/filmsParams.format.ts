import { IFilmsGetRequest } from '@/types/api/films.api.interface'
import { formatCapitalize } from './capitalize.format'
import { ParsedUrlQuery } from 'querystring'
/*
  * @param {ParsedUrlQuery | undefined} queryParams - параметры в адресной
    строке
  * @returns IFilmsGetRequest - параметры для запроса

*/
export const formatFilmsParams = (
  queryParams: ParsedUrlQuery | undefined
): IFilmsGetRequest => {
  if (!queryParams) return {}

  const defaultParams: IFilmsGetRequest = {
    take: 14,
    page: 1,
  }
  const currentParams: IFilmsGetRequest = { ...defaultParams }

  for (let param in queryParams) {
    let paramValue = queryParams[param]
    if (!paramValue) continue

    if (
      [
        'genres',
        'genres_en',
        'countries',
        'director',
        'actor',
        'scoreAVG',
      ].includes(param)
    ) {
      paramValue = (paramValue as string).split(',')

      currentParams[
        param as keyof Omit<
          typeof currentParams,
          'take' | 'page' | 'order' | 'orderBy'
        >
      ] = ['genres', 'genres_en'].includes(param)
        ? paramValue.map(genre => formatCapitalize(genre, { reverse: true }))
        : paramValue
    } else {
      currentParams[
        param as keyof Pick<typeof currentParams, 'order' | 'orderBy'>
      ] = paramValue as string
    }
  }

  return currentParams
}
