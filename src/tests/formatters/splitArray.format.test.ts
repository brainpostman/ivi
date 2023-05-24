import { transformFilms } from '@/api/transforms/films.transform'
import { filmsListData } from '@/data/films.data'
import { formatSplitArray } from '@/formatters/splitArray.format'
import { IMovie } from '@/types/films.api.interface'

const testValidValue: IMovie[] = transformFilms(filmsListData)
const testSplittedNum = 3

const expectedValidValue = Math.round(testValidValue.length / testSplittedNum)

const testInvalidSpecificElement = [
  undefined,
  ...filmsListData,
  undefined,
] as unknown as IMovie[]

const testInvalidFilmsUndefined = undefined as unknown as IMovie[]
const testInvalidFilmsType = 'films' as unknown as IMovie[]

describe('FORMAT formatSplitArray', () => {
  // Корректное значение
  it('Valid value', () => {
    const splittedFilms = formatSplitArray(testValidValue, testSplittedNum)

    expect(splittedFilms.length).toBe(expectedValidValue)
  })

  // Корректное значение с параметров evenly = true
  it('Valid value with option evenly', () => {
    const splittedFilms = formatSplitArray(testValidValue, testSplittedNum, {
      evenly: true,
    })

    expect(splittedFilms.length).toBe(testSplittedNum)
  })
})

describe('FORMAT ERROR formatSplitArray', () => {
  // Некорректное значение массива {undefined}
  it('Invalid array value {undefined}', () => {
    const splittedFilms = formatSplitArray(
      testInvalidFilmsUndefined,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })

  // Некорректное значение массива (неправильный тип)
  it('Invalid array value (wrong type)', () => {
    const splittedFilms = formatSplitArray(
      testInvalidFilmsType,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })

  // Некорректное значение одного элемента массива
  it('Invalid array element value', () => {
    const splittedFilms = formatSplitArray(
      testInvalidSpecificElement,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })
})
