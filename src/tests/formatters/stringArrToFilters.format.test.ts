import formatStringArrToFilters from '@/formatters/stringArrToFilters.format'

const testFilterNames = ['genre1', 'genre2', 'genre3']
const expectedTestFilterNames = [
  { id: 1, name: 'genre1' },
  { id: 2, name: 'genre2' },
  { id: 3, name: 'genre3' },
]

describe('FORMAT formatStringArrToFilters', () => {
  it('Valid values', () => {
    const formattedValue = formatStringArrToFilters(testFilterNames)

    expect(formattedValue).toStrictEqual(expectedTestFilterNames)
  })
})
