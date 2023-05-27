import formatQueryLocale from '@/formatters/queryLocale.format'

const testRusQuery = 'genre'
const testEngQuery = 'genre_en'

describe('FORMAT formatQueryLocale', () => {
  // Русский язык
  it('Russian lang', () => {
    const formattedValue = formatQueryLocale(testRusQuery, testEngQuery, 'ru')()

    expect(formattedValue).toBe(testRusQuery)
  })

  // Английский язык
  it('English lang', () => {
    const formattedValue = formatQueryLocale(testRusQuery, testEngQuery, 'en')()

    expect(formattedValue).toBe(testEngQuery)
  })
})
