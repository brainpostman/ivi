import { formatScores } from '@/formatters/scores.format'

const testInteger = 5
const testFloatNumber = 4.3

describe('FORMAT scores', () => {
  // Проверяем целое число
  it('Integer', () => {
    const formattedValue = formatScores(testInteger)

    expect(formattedValue).toStrictEqual([testInteger.toString(), ',0'])
  })

  // Проверяем дробное число
  it('Float number', () => {
    const formattedValue = formatScores(testFloatNumber)

    expect(formattedValue).toStrictEqual(['4', ',3'])
  })
})
