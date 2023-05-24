import { IQuerySuggest, IStaff } from '@/types/staffs.interface'
import { staffsAPI } from '@/api/queries/staffs.api'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'
import { staffRequiredProperties } from '@/data/requiredProperties.data'

const testSubString = 'ом'
const testStaffType: IQuerySuggest = 'actor'

describe('API-STAFFS', () => {
  let directors: IStaff[]
  let actors: IStaff[]
  let staffById: IStaff | undefined
  let staffsByParams: IStaff[]

  beforeAll(async () => {
    directors = await staffsAPI.getDirectors()
    actors = await staffsAPI.getActors()
    staffById = await staffsAPI.getStaffById(12)
    staffsByParams = await staffsAPI.getStaffByParams({
      search: testSubString,
      type: testStaffType,
    })
  })

  // Проверка полей режиссёров
  it('Directors properties', () => {
    directors.map(director =>
      checkObjHaveProperties(director, staffRequiredProperties)
    )
  })

  // Проверка полей актёров
  it('Actors properties', () => {
    actors.map(actor => checkObjHaveProperties(actor, staffRequiredProperties))
  })

  // Проверяем участника по id
  it('Staff by id', () => {
    expect(staffById).toBeTruthy()
    if (staffById) {
      checkObjHaveProperties(staffById, staffRequiredProperties)
    }
  })

  // Проверяем участника по подстроке и типу
  it('Staffs by params', () => {
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
