import formatScoreAVG from '@/formatters/scoreAVG.format'

const testValidValue = 0.035678
const expectedValidValue = 0.04

const testInvalidNumber = 'abc' as unknown as number

describe('FORMAT formatScoreAVG', () => {
  // Корректное значение
  it('Valid value', () => {
    const formattedValue = formatScoreAVG(testValidValue)
    expect(formattedValue).toBe(expectedValidValue)
  })
})

describe('FORMAT ERROR formatScoreAVG', () => {
  // Undefined
  it('Undefined value', () => {
    const formattedValue = formatScoreAVG(undefined)
    expect(formattedValue).toBe(0)
  })

  it('Not number value', () => {
    const formattedValue = formatScoreAVG(testInvalidNumber)
    expect(formattedValue).toBe(0)
  })
})
