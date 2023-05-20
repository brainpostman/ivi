import { handlerFilterSliderPaired } from '@/handlers/filterSlider.handler'
import { IQueryRange, IRangeWithPartial } from '@/types/utils.interface'

const testValidQuery: IQueryRange = {
  min: 'min',
  max: 'max',
}

const testValidRange: IRangeWithPartial = {
  max: 10,
}

const testInvalidRange = {} as IRangeWithPartial
const testInvalidQueryWithoutMin = { max: 'max' } as IQueryRange
const testInvalidQueryWithoutMax = { min: 'min' } as IQueryRange

describe('HANDLER handlerFilterSliderPaired', () => {
  // Корректное значение
  it('Valid value', () => {
    const isPairedSlider = handlerFilterSliderPaired(
      testValidQuery,
      testValidRange
    )

    expect(isPairedSlider).toBeTruthy()
  })
})

describe('HANDLER ERROR handlerFilterSliderPaired', () => {
  // Некорректное значение range
  it('Invalid range value', () => {
    const isPairedSlider = handlerFilterSliderPaired(
      testValidQuery,
      testInvalidRange
    )

    expect(isPairedSlider).toBeFalsy()
  })

  // Некорректное значение query (без min)
  it('Invalid query value (without min)', () => {
    const isPairedSlider = handlerFilterSliderPaired(
      testInvalidQueryWithoutMin,
      testValidRange
    )

    expect(isPairedSlider).toBeFalsy()
  })

  // Некорректное значение query (без max)
  it('Invalid query value (without max)', () => {
    const isPairedSlider = handlerFilterSliderPaired(
      testInvalidQueryWithoutMax,
      testValidRange
    )

    expect(isPairedSlider).toBeFalsy()
  })
})
