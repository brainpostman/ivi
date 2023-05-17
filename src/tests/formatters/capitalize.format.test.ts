import { formatCapitalize } from '@/formatters/capitalize.format'

const testStringForCap = 'word'
const testStringForCapReverse = 'Word'

describe('FORMAT capitalize', () => {
  // Проверка первой заглавной буквы
  it('Capitalize first element', () => {
    const result = formatCapitalize(testStringForCap)

    const check = testStringForCap[0].toUpperCase() === result[0]

    expect(check).toBeTruthy()
  })

  // Проверка первой строчной буквы
  it('Capitalize reverse first element', () => {
    const result = formatCapitalize(testStringForCapReverse, { reverse: true })

    const check = testStringForCapReverse[0].toLowerCase() === result[0]

    expect(check).toBeTruthy()
  })
})
