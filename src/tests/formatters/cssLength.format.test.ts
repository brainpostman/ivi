import formatCssLength from '@/formatters/cssLength.format'

const testStringPx = '120px'
const pxReg = /^[^0](\d*)px$/

const testStringWithPercent = '70%'
const percentReg = /^(\d*)%$/

const testNumber = 100

const testError = 'some string'

describe('cssLength formatter', () => {
  // Проверяем строку с пикселями
  it('Check string with px', () => {
    const formtattedValue = formatCssLength(testStringPx)
    const result = pxReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })

  // Проверяем строку с процентами
  it('Check string with percent', () => {
    const formtattedValue = formatCssLength(testStringWithPercent)
    const result = percentReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })

  // Проверяем число
  it('Check number', () => {
    const formtattedValue = formatCssLength(testNumber)
    const result = pxReg.test(formtattedValue)

    expect(result).toBeTruthy()
  })
})

// Проверяем ошибки
describe('cssLength formatter ERROR', () => {
  // Проверяем некорректную строку
  it('Check wrong value', () => {
    const formtattedValue = formatCssLength(testError)
    const result = formtattedValue === '0px'

    expect(result).toBeTruthy()
  })
})
