import { formatCapitalize } from '@/formatters/capitalize.format'
import { formatPairSliderQuery } from '@/formatters/pairSliderQuery.format'

const testQueryParam = 'rating'
const errorTestQueryParam = ''

describe('FORMAT pair slider query', () => {
  it('Query param', () => {
    const { maxValueStr, minValueStr } = formatPairSliderQuery(testQueryParam)
    const formattedQueryParam = formatCapitalize(testQueryParam)

    expect(maxValueStr).toBe(`max${formattedQueryParam}`)
    expect(minValueStr).toBe(`min${formattedQueryParam}`)
  })
})

describe('FORMAT ERROR pair slider query', () => {
  it('ERROR query param', () => {
    const { maxValueStr, minValueStr } =
      formatPairSliderQuery(errorTestQueryParam)

    expect(maxValueStr).toBe('max')
    expect(minValueStr).toBe('min')
  })
})
