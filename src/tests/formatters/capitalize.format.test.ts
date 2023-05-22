import { formatCapitalize } from '@/formatters/capitalize.format'

const testStringForCap = 'word'
const testStringForCapReverse = 'Word'

const testInvalidValue = undefined

describe('FORMAT formatCapitalize', () => {
  // Проверка первой заглавной буквы
  it('Capitalize first element', () => {
    const formattedValue = formatCapitalize(testStringForCap)

    expect(testStringForCap[0].toUpperCase()).toBe(formattedValue[0])
  })

  // Проверка первой строчной буквы
  it('Capitalize reverse first element', () => {
    const formattedValue = formatCapitalize(testStringForCapReverse, {
      reverse: true,
    })

    expect(testStringForCapReverse[0].toLowerCase()).toBe(formattedValue[0])
  })
})

describe('FORMAT ERROR formatCapitalize', () => {
  // Некорректное значение
  it('Invalid value', () => {
    const formattedValue = formatCapitalize(testInvalidValue)
    expect(formattedValue).toBe('')
  })
})
