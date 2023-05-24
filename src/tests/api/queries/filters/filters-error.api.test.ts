import { filtersAPI } from '@/api/queries/filters.api'
import { ICRUDGenre } from '@/types/ICrudMovie'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'

describe('API-FILTERS ERROR', () => {
  let errorGenres: IFilterGetResponse[]
  //let errorCountries: IFilterGetResponse[]

  let errorCrudGenres: ICRUDGenre[]

  beforeAll(async () => {
    errorGenres = await filtersAPI.getGenres('ru', { page: -1 })
    errorCrudGenres = await filtersAPI.getCrudGenres({ page: -1 })
  })

  // Проверяем ошибку жанров
  it('Genres error', () => {
    expect(errorGenres).toStrictEqual([])
  })

  // Проверяем ошибку круда жанров
  it('Check crud genres error', () => {
    expect(errorCrudGenres).toStrictEqual([])
  })
})
