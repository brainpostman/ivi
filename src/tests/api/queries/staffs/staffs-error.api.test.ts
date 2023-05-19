import { staffsAPI } from '@/api/queries/staffs.api'
import { ICRUDGenre } from '@/types/ICrudMovie'
import { IStaff } from '@/types/staffs.interface'

describe('API-STAFFS ERROR', () => {
  let errorDirectors: IStaff[]
  let errorActors: IStaff[]
  let errorCrudGenres: ICRUDGenre[]
  let errorStaffById: IStaff | undefined
  let errorStaffsByParams: IStaff[]

  beforeAll(async () => {
    errorDirectors = await staffsAPI.getDirectors({ page: -1 })
    errorActors = await staffsAPI.getActors({ page: -1 })

    errorCrudGenres = await staffsAPI.getCrudGenres({ page: -1 })
    errorStaffById = await staffsAPI.getStaffById(-1)
    errorStaffsByParams = await staffsAPI.getStaffByParams({ page: -1 })
  })

  // Проверяем ошибку режиссёров
  it('Directors error', () => {
    expect(errorDirectors).toStrictEqual([])
  })

  // Проверяем ошибку актёров
  it('Actors error', () => {
    expect(errorActors).toStrictEqual([])
  })

  // Проверяем ошибку круда жанров
  //it('Check crud genres error', () => {
  //  // FIXME: Не считает page=-1 за ошибку
  //  expect(errorCrudGenres).toStrictEqual([])
  //})

  // Проверяем ошибку участника по id
  it('Staff by id error', () => {
    expect(errorStaffById).toBeFalsy()
  })

  // Проверяем ошибку участника по параметрам
  it('Staffs by params error', () => {
    expect(errorStaffsByParams).toStrictEqual([])
  })
})
