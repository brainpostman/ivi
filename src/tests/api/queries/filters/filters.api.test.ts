import { staffsAPI } from '@/api/queries/staffs.api'
import { filterRequiredProperties } from '@/data/requiredProperties.data'
import { IFilterGetResponse } from '@/types/filters.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

describe('API-FILTERS', () => {
  let countries: IFilterGetResponse[]
  let genres: IFilterGetResponse[]

  beforeAll(async () => {
    genres = await staffsAPI.getGenres('ru')
    countries = await staffsAPI.getCountries()
  })

  // Проверка полей жанров
  it('Genres properties', () => {
    genres.map(genre => checkObjHaveProperties(genre, filterRequiredProperties))
  })

  // Проверка полей стран
  it('Countries properties', () => {
    countries.map(country =>
      checkObjHaveProperties(country, filterRequiredProperties)
    )
  })
})
