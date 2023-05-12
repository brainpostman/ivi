import { formatCapitalize } from '@/formatters/capitalize.format'
import { formatPairSliderQuery } from '@/formatters/pairSliderQuery.format'

const testQueryParam = 'rating'
const errorTestQueryParam = ''

describe('PAIR SLIDER QUERY', () => {
  it('Check query param', () => {
    const { maxValueStr, minValueStr } = formatPairSliderQuery(testQueryParam)
    const formattedQueryParam = formatCapitalize(testQueryParam)

    const checkMaxValueStr = `max${formattedQueryParam}` === maxValueStr
    const checkMinValueStr = `min${formattedQueryParam}` === minValueStr

    expect(checkMaxValueStr).toBeTruthy()
    expect(checkMinValueStr).toBeTruthy()
  })

  it('Check error query param', () => {
    const { maxValueStr, minValueStr } =
      formatPairSliderQuery(errorTestQueryParam)

    const checkMaxValueStr = maxValueStr === 'max'
    const checkMinValueStr = minValueStr === 'min'

    expect(checkMaxValueStr).toBeTruthy()
    expect(checkMinValueStr).toBeTruthy()
  })
})
