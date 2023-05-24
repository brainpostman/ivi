import formatCssLength from '@/formatters/cssLength.format'

const testStringPx = '120px'
const pxReg = /^[^0](\d*)px$/

const testStringWithPercent = '70%'
const percentReg = /^(\d*)%$/

const testNumber = 100

const testError = 'some string'

describe('FORMAT formatCssLength', () => {
  // Проверяем строку с пикселями
  it('String with px', () => {
    const formtattedValue = formatCssLength(testStringPx)
    const result = pxReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })

  // Проверяем строку с процентами
  it('String with percent', () => {
    const formtattedValue = formatCssLength(testStringWithPercent)
    const result = percentReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })

  // Проверяем число
  it('Number', () => {
    const formtattedValue = formatCssLength(testNumber)
    const result = pxReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })
})

// Проверяем ошибки
describe('FORMAT ERROR formatCssLength', () => {
  // Проверяем некорректную строку
  it('Wrong value', () => {
    const formtattedValue = formatCssLength(testError)

    expect(formtattedValue).toBe('0px')
  })
})
