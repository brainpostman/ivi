import { transformStaffs } from '@/api/transforms/staff.transform'
import { staffDataResponse } from '@/data/staff.data'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

const testValidStaffs = [staffDataResponse, staffDataResponse]
const testInvalidStaffs = []

describe('TRANSFORM staff', () => {
  // Корректное значение
  it('Valid value', () => {
    const transformedStaff = transformStaffs(testValidStaffs)
    transformedStaff.forEach(staff => checkObjHaveProperties(staff, ['type']))
  })
})

describe('TRANSFORM ERROR staff', () => {
  // Undefined
  it('Undefined', () => {
    const transformedStaff = transformStaffs(undefined)
    expect(transformedStaff).toStrictEqual([])
  })

  // Пустой массив
  it('Empty array', () => {
    const transformedStaff = transformStaffs([])
    const result = transformedStaff.filter(staff => staff.type)

    expect(result).toStrictEqual([])
  })
})
