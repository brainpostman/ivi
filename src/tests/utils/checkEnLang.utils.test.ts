import checkEnLang from '@/utils/checkEnLang.utils'

const testValueRus = 'Значение'
const testValuEng = 'Value'

describe('UTIL checkEnLang', () => {
  // Значение на русском языке
  it('Russian lang', () => {
    const isEng = checkEnLang(testValueRus)
    expect(isEng).toBeFalsy()
  })

  // Значение на английском языке
  it('English lang', () => {
    const isEng = checkEnLang(testValuEng)
    expect(isEng).toBeTruthy()
  })
})
