import formatStringArrToStaff from '@/formatters/stringArrToStaff.format'
import { IStaffGetResponse, IStaffType } from '@/types/api/staffs.api.interface'

const testStaffNames = ['actor1', 'actor2', 'actor3']
const testStaffType: IStaffType = 'actor'

const expectedTestStaffNames: IStaffGetResponse[] = [
  {
    id: 1,
    name: 'actor1',
    biography: 'Биография',
    types: [{ name: testStaffType }],
  },
  {
    id: 2,
    name: 'actor2',
    biography: 'Биография',
    types: [{ name: testStaffType }],
  },
  {
    id: 3,
    name: 'actor3',
    biography: 'Биография',
    types: [{ name: testStaffType }],
  },
]

describe('FORMAT stringArrToStaff', () => {
  it('Valid values', () => {
    const formattedValue = formatStringArrToStaff(testStaffNames, testStaffType)
    expect(formattedValue).toStrictEqual(expectedTestStaffNames)
  })
})
