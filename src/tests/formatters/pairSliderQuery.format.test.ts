import { formatCapitalize } from '@/formatters/capitalize.format'
import { formatMinMaxQuery } from '@/formatters/minMaxQuery.format'

const testQueryParam = 'rating'
const errorTestQueryParam = ''

describe('FORMAT formatMinMaxQuery', () => {
  it('Query param', () => {
    const { maxValueStr, minValueStr } = formatMinMaxQuery(testQueryParam)
    const formattedQueryParam = formatCapitalize(testQueryParam)

    expect(maxValueStr).toBe(`max${formattedQueryParam}`)
    expect(minValueStr).toBe(`min${formattedQueryParam}`)
  })
})

describe('FORMAT ERROR formatMinMaxQuery', () => {
  it('ERROR query param', () => {
    const { maxValueStr, minValueStr } = formatMinMaxQuery(errorTestQueryParam)

    expect(maxValueStr).toBe('max')
    expect(minValueStr).toBe('min')
  })
})
