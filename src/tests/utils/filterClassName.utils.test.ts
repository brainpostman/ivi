import getFilterClassName from '@/utils/filterClassName.utils'

const testExistFilter = 'genre1'
const testNonExistFilter = 'genre3'

const testClassName = 'testClassName'

const testValidUrlFilter = 'genre1,genre2'

describe('UTIL getFilterClassName', () => {
  // Существующее значение фильтра
  it('Exist filter', () => {
    const resultClassName = getFilterClassName(
      testExistFilter,
      testClassName,
      testValidUrlFilter
    )

    expect(resultClassName).toBe(testClassName)
  })

  // Несуществующее значение фильтра
  it('Non-Existent filter', () => {
    const resultClassName = getFilterClassName(
      testNonExistFilter,
      testClassName,
      testValidUrlFilter
    )

    expect(resultClassName).toBe('')
  })
})

describe('UTIL ERROR getFilterClassName', () => {
  // Некорректное значение urlFilter
  it('Invalid urlFilter {undefined)', () => {
    const resultClassName = getFilterClassName(
      testNonExistFilter,
      testClassName,
      undefined
    )

    expect(resultClassName).toBe('')
  })
})
