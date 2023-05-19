import formatStrToNum from '@/formatters/strToNum.format'

const testValidString = '42'
const expectedTestValidString = 42

const testNumber = 42

const testInvalidString = 'test'

describe('FORMAT strToNum', () => {
  // Валидная Строка
  it('Valid string', () => {
    const formattedValue = formatStrToNum(testValidString)
    expect(formattedValue).toBe(expectedTestValidString)
  })

  // Число
  it('Number', () => {
    const formattedValue = formatStrToNum(testNumber)
    expect(formattedValue).toBe(testNumber)
  })
})

describe('ERROR FORMAT strToNum', () => {
  // Невалидная строка
  it('Invalid string', () => {
    const formattedValue = formatStrToNum(testInvalidString)
    expect(formattedValue).toBe(0)
  })

  // undefined
  it('Undefined', () => {
    const formattedValue = formatStrToNum(undefined)
    expect(formattedValue).toBe(0)
  })
})
