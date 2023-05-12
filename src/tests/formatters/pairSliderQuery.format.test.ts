import { formatCapitalize } from '@/formatters/capitalize.format'
import { formatPairSliderQuery } from '@/formatters/pairSliderQuery.format'

const testQueryParam = 'rating'
const errorTestQueryParam = ''

describe('PAIR SLIDER QUERY', () => {
  it('Check query param', () => {
    const { maxValueStr, minValueStr } = formatPairSliderQuery(testQueryParam)
    const formattedQueryParam = formatCapitalize(testQueryParam)

    expect(maxValueStr).toBe(`max${formattedQueryParam}`)
    expect(minValueStr).toBe(`min${formattedQueryParam}`)
  })

  it('Check error query param', () => {
    const { maxValueStr, minValueStr } =
      formatPairSliderQuery(errorTestQueryParam)

    expect(maxValueStr).toBe('max')
    expect(minValueStr).toBe('')
  })
})
