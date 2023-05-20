import { filtersAPI } from '@/api/queries/filters.api'
import {
  crudGenreRequiredProperties,
  filterRequiredProperties,
} from '@/data/requiredProperties.data'
import { ICRUDGenre } from '@/types/ICrudMovie'
import { IFilterGetResponse } from '@/types/filters.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

const enReg = /^[a-zA-Z]+$/

describe('API-FILTERS', () => {
  let countries: IFilterGetResponse[]
  let genres: IFilterGetResponse[]

  let enGenres: IFilterGetResponse[]

  let crudGenres: ICRUDGenre[]

  beforeAll(async () => {
    genres = await filtersAPI.getGenres('ru')
    countries = await filtersAPI.getCountries()
    crudGenres = await filtersAPI.getCrudGenres()
    enGenres = await filtersAPI.getGenres('en')
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

  // Проверка полей круда жанров
  it('Crud genre properties', () => {
    crudGenres.map(actor =>
      checkObjHaveProperties(actor, crudGenreRequiredProperties)
    )
  })

  // Проверяем en локаль
  it('Genre EN locale', () => {
    const copyEnGenres = [...enGenres]
    copyEnGenres.filter(enGenre => enReg.test(enGenre.name))

    expect(copyEnGenres.length).toBe(enGenres.length)
  })
})
