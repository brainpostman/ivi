import { getNumGridColumns } from '@/utils/grid.utils'

const testRowsLength = 12
const testGridColumnLines = 4

describe('UTIL getNumGridColumns', () => {
  it('Check working', () => {
    const result = getNumGridColumns(testRowsLength, testGridColumnLines)
    expect(result).toBe(testRowsLength / testGridColumnLines)
  })
})
