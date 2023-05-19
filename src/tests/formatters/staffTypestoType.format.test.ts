import { staffData } from '@/data/staff.data'
import { staffDataResponse } from '@/data/staff.data'
import formatStaffTypestoType from '@/formatters/staffTypestoType.format'

const testValidValue = staffDataResponse
const expectedValidValue = staffData

describe('FORMAT formatStaffTypestoType', () => {
  // Корректное значение
  it('Valid value', () => {
    const formattedValue = formatStaffTypestoType(testValidValue)
    expect(formattedValue).toStrictEqual(expectedValidValue)
  })
})
