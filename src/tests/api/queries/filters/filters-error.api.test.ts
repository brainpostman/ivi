import { staffsAPI } from '@/api/queries/staffs.api'
import { IFilterGetResponse } from '@/types/filters.interface'

describe('API-FILTERS ERROR', () => {
  let errorGenres: IFilterGetResponse[]
  //let errorCountries: IFilterGetResponse[]

  beforeAll(async () => {
    errorGenres = await staffsAPI.getGenres('ru', { page: -1 })
  })

  // Проверяем ошибку жанров
  it('Genres error', () => {
    expect(errorGenres).toStrictEqual([])
  })
})
