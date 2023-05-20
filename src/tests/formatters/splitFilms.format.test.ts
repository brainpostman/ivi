import { transformFilms } from '@/api/transforms/films.transform'
import { filmsListData } from '@/data/films.data'
import formatSplitFilms from '@/formatters/splitFilms.format'
import { IMovie } from '@/types/films.api.interface'

const testValidFilms: IMovie[] = filmsListData.map(film => transformFilms(film))
const testSplittedNum = 3

const testInvalidSpecificFilm = [
  undefined,
  ...filmsListData,
  undefined,
] as unknown as IMovie[]

const testInvalidFilmsUndefined = undefined as unknown as IMovie[]
const testInvalidFilmsType = 'films' as unknown as IMovie[]

describe('FORMAT formatSplitFilms', () => {
  // Корректное значение
  it('Valid value', () => {
    const splittedFilms = formatSplitFilms(testValidFilms, testSplittedNum)
    expect(splittedFilms.length).toBe(testSplittedNum)
  })
})

describe('FORMAT ERROR formatSplitFilms', () => {
  // Некорректное значение фильмов {undefined}
  it("Invalid film's value {undefined}", () => {
    const splittedFilms = formatSplitFilms(
      testInvalidFilmsUndefined,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })

  // Некорректное значение фильмов (неправильный тип)
  it("Invalid film's value (wrong type)", () => {
    const splittedFilms = formatSplitFilms(
      testInvalidFilmsType,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })

  // Некорректное значение одного фильма
  it("Invalid specific film's value", () => {
    const splittedFilms = formatSplitFilms(
      testInvalidSpecificFilm,
      testSplittedNum
    )
    expect(splittedFilms).toStrictEqual([[]])
  })
})
