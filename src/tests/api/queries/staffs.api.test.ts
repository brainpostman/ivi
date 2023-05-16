import {
  IFilterGetResponse,
  IQuerySuggest,
  IStaff,
} from '@/types/staffs.interface'
import { staffsAPI } from '@/api/queries/staffs.api'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'
import { ICRUDGenre } from '@/types/ICrudMovie'

const testSubString = 'ом'
const testStaffType: IQuerySuggest = 'actor'

const staffRequiredProperties = ['id', 'name']

const crudGenreRequiredProperties = [
  'id',
  'name',
  'name_en',
  'createdAt',
  'updatedAt',
]

describe('STAFFS API', () => {
  let genres: IFilterGetResponse[]
  let countries: IFilterGetResponse[]
  let directors: IStaff[]
  let actors: IStaff[]
  let staffById: IStaff | undefined
  let staffsByParams: IStaff[]

  let crudGenres: ICRUDGenre[]

  beforeAll(async () => {
    genres = await staffsAPI.getGenres('ru')
    countries = await staffsAPI.getCountries()
    directors = await staffsAPI.getDirectors()
    actors = await staffsAPI.getActors()
    crudGenres = await staffsAPI.getCrudGenres()
    staffById = await staffsAPI.getStaffById(12)
    staffsByParams = await staffsAPI.getStaffByParams({
      search: testSubString,
      type: testStaffType,
    })
  })

  // Проверка полей жанров
  it('Check genres properties', () => {
    genres.map(genre => checkObjHaveProperties(genre, staffRequiredProperties))
  })

  // Проверка полей стран
  it('Check countries properties', () => {
    countries.map(country =>
      checkObjHaveProperties(country, staffRequiredProperties)
    )
  })

  // Проверка полей режиссёров
  it('Check directors properties', () => {
    directors.map(director =>
      checkObjHaveProperties(director, staffRequiredProperties)
    )
  })

  // Проверка полей актёров
  it('Check actors properties', () => {
    actors.map(actor => checkObjHaveProperties(actor, staffRequiredProperties))
  })

  // Проверка полей круда жанров
  it('Check crud genre properties', () => {
    crudGenres.map(actor =>
      checkObjHaveProperties(actor, crudGenreRequiredProperties)
    )
  })

  // Проверяем участника по id
  it('Check staff by id', () => {
    expect(staffById).toBeTruthy()
    if (staffById) {
      checkObjHaveProperties(staffById, staffRequiredProperties)
    }
  })

  // Проверяем участника по подстроке и типу
  it('Check staffs by params', () => {
    staffsByParams.forEach(staff =>
      checkObjHaveProperties(staff, staffRequiredProperties)
    )

    staffsByParams.forEach(staff => expect(staff.type).toBe(testStaffType))

    staffsByParams.forEach(staff => {
      const isExistSubstr = staff.name.toLowerCase().includes(testSubString)
      expect(isExistSubstr).toBeTruthy()
    })
  })
})
