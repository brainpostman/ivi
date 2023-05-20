import { IMovie } from '@/types/films.api.interface'

/*
  * Разделяет фильмы на несколько массивов

  * @param {IMovie[]} films - фильмы
  * @param {number} splittedNum - количество массивов
  * @returns IMovie[][]

*/

const formatSplitFilms = (films: IMovie[], splittedNum: number): IMovie[][] => {
  // Проверяем корректность данных
  if (!films) {
    console.error('FORMAT formatSplitFilms wrong films value {undefined}')
    return [[]]
  }

  if (!Array.isArray(films)) {
    console.error("FORMAT formatSplitFilms wrong film's type")
    return [[]]
  }

  for (let index = 0; index < films.length; index++) {
    if (!films[index]) {
      console.error(
        `FORMAT formatSplitFilms wrong film's type; INDEX = ${index}`
      )
      return [[]]
    }
  }

  const countFilmsForOneLine = Math.round(films.length / splittedNum)

  const formattedArray: IMovie[][] = []

  for (let index = 0; index < splittedNum; index++) {
    const newFilmsArray = films.slice(
      index * countFilmsForOneLine,
      (index + 1) * countFilmsForOneLine
    )

    formattedArray.push(newFilmsArray)
  }

  return formattedArray
}

export default formatSplitFilms
