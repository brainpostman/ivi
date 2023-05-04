import { IFilmsGetRequest } from '@/types/films.api.interface'
import { formatCapitalize } from './capitalize.format'
import { ParsedUrlQuery } from 'querystring'

export const formatFilmsParams = (queryParams: ParsedUrlQuery | undefined) => {
  if (!queryParams) return {}

  const defaultParams: IFilmsGetRequest = {
    take: 14,
    page: 1,
  }
  const currentParams = { ...defaultParams }

  for (let param in queryParams) {
    let paramValue = queryParams[param]
    if (!paramValue) continue

    if (
      ['genres', 'country', 'director', 'actor', 'scoreAVG'].includes(param)
    ) {
      paramValue = (paramValue as string).split(',')

      currentParams[
        param as keyof Omit<
          typeof currentParams,
          'take' | 'page' | 'order' | 'orderBy'
        >
      ] = paramValue
    } else {
      currentParams[
        param as keyof Pick<typeof currentParams, 'order' | 'orderBy'>
      ] = paramValue as string
    }
  }

  return currentParams
}
