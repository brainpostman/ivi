import {
  IFilterSliderType,
  IQueryRange,
  IRangeWithPartial,
} from '@/types/utils.interface'
import { getFilterSliderType } from '@/utils/filterSlider.utils'

interface ISingleSlider {
  query: string
  range: IRangeWithPartial
}

interface IPairedSlider {
  query: IQueryRange
  range: IRangeWithPartial
}

const testSingleSlider: ISingleSlider = {
  query: 'testQuery',
  range: {
    max: 10,
  },
}

const testPairedSlider: IPairedSlider = {
  query: {
    min: 'min',
    max: 'max',
  },
  range: {
    max: 10,
  },
}

const testInvalidSlider = {
  query: 'testQuery',
  range: {},
} as ISingleSlider

const expectedSingleSlider: IFilterSliderType = 'single'
const expectedPairedSlider: IFilterSliderType = 'paired'

describe('getFilterSliderType', () => {
  // Одиночный слайдер
  it('SingleSlider', () => {
    const sliderType = getFilterSliderType(
      testSingleSlider.query,
      testSingleSlider.range
    )

    expect(sliderType).toBe(expectedSingleSlider)
  })

  // Парный слайдер
  it('PairedSlider', () => {
    const sliderType = getFilterSliderType(
      testPairedSlider.query,
      testPairedSlider.range
    )

    expect(sliderType).toBe(expectedPairedSlider)
  })
})

describe('ERROR getFilterSliderType', () => {
  // Некорректные значения
  it('Invalid values', () => {
    const sliderType = getFilterSliderType(
      testInvalidSlider.query,
      testInvalidSlider.range
    )

    expect(sliderType).toBe(undefined)
  })
})
