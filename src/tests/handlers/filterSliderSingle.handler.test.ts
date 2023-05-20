import { handlerFilterSliderSingle } from '@/handlers/filterSlider.handler'
import { IRangeWithPartial } from '@/types/utils.interface'

const testValidQuery = 'testQuery'
const testValidRange: IRangeWithPartial = {
  max: 10,
}

const testInvalidSliderRangeQuery = {} as string
const testInvalidSliderSingleRange = {} as IRangeWithPartial

describe('HANDLER handlerFilterSliderSingle', () => {
  // Корректное значение
  it('Valid value', () => {
    const isSliderSingle = handlerFilterSliderSingle(
      testValidQuery,
      testValidRange
    )

    expect(isSliderSingle).toBeTruthy()
  })
})

describe('HANDLER ERROR filterSlider', () => {
  // Некорректное значение range
  it('Invalid range value', () => {
    const isSliderSingle = handlerFilterSliderSingle(
      testValidQuery,
      testInvalidSliderSingleRange
    )

    expect(isSliderSingle).toBeFalsy()
  })

  // Некорректные значения
  it('Invalid values', () => {
    const isSliderSingle = handlerFilterSliderSingle(
      testInvalidSliderRangeQuery,
      testInvalidSliderSingleRange
    )

    expect(isSliderSingle).toBeFalsy()
  })
})
