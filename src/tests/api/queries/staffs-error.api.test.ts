import { staffsAPI } from '@/api/queries/staffs.api'
import { ICRUDGenre } from '@/types/ICrudMovie'
import { IFilterGetResponse } from '@/types/filters.interface'
import { IStaff } from '@/types/staffs.interface'

describe('STAFFS API ERRORS', () => {
  let errorGenres: IFilterGetResponse[]
  //let errorCountries: IFilterGetResponse[]
  let errorDirectors: IStaff[]
  let errorActors: IStaff[]
  let errorCrudGenres: ICRUDGenre[]
  let errorStaffById: IStaff | undefined
  let errorStaffsByParams: IStaff[]

  beforeAll(async () => {
    errorGenres = await staffsAPI.getGenres('ru', { page: -1 })
    errorDirectors = await staffsAPI.getDirectors({ page: -1 })
    errorActors = await staffsAPI.getActors({ page: -1 })

    errorCrudGenres = await staffsAPI.getCrudGenres({ page: -1 })
    errorStaffById = await staffsAPI.getStaffById(-1)
    errorStaffsByParams = await staffsAPI.getStaffByParams({ page: -1 })
  })

  // Проверяем ошибку жанров
  it('Check genres error', () => {
    expect(errorGenres).toStrictEqual([])
  })

  // Проверяем ошибку режиссёров
  it('Check directors error', () => {
    expect(errorDirectors).toStrictEqual([])
  })

  // Проверяем ошибку актёров
  it('Check actors error', () => {
    expect(errorActors).toStrictEqual([])
  })

  // Проверяем ошибку круда жанров
  //it('Check crud genres error', () => {
  //  // FIXME: Не считает page=-1 за ошибку
  //  expect(errorCrudGenres).toStrictEqual([])
  //})

  // Проверяем ошибку участника по id
  it('Check staff by id error', () => {
    expect(errorStaffById).toBeFalsy()
  })

  // Проверяем ошибку участника по параметрам
  it('Check staffs by params error', () => {
    expect(errorStaffsByParams).toStrictEqual([])
  })
})
