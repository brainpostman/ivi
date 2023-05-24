// @param {boolean} evenly - равномерно

interface IOptions {
  evenly?: boolean
}

/*
  * Делит массив по указанной длине
  * @param {T} array - исходный массив
  * @param {number} length - максимальная длина массива / количество массивов
  * @param {IOptions} options - опции
  * @returns T[] | [[]] - отформатированный массив

*/

export const formatSplitArray = <T>(
  array: T | undefined,
  length: number,
  options?: IOptions
): T[] | [[]] => {
  // Проверяем корректность данных
  if (!array) {
    console.error('FORMAT formatSplitArray wrong array value {undefined}')
    return [[]]
  }

  if (!Array.isArray(array)) {
    console.error('FORMAT formatSplitArray wrong array type')
    return [[]]
  }

  const arrayCount = Math.round(array.length / length)

  const result: T[] | [[]] = options?.evenly
    ? formatEvenlySplitArray(array, length, arrayCount)
    : formatSimpleSplitArray(array, length, arrayCount)

  return result
}

/*
  * Делит массив на указанное число

  * @param {T} array - массив
  * @param {number} length - выходное количество массивов
  * @returns T[] | [[]]

*/

const formatEvenlySplitArray = <T extends any[]>(
  array: T,
  length: number,
  arrayCount: number
): T[] | [[]] => {
  const result: T[] = []
  for (let index = 0; index < length; index++) {
    if (!array[index]) {
      console.error(
        `FORMAT formatSplitArray wrong array type; INDEX = ${index}`
      )
      return [[]]
    }
    const newArray = array.slice(
      index * arrayCount,
      (index + 1) * arrayCount
    ) as T

    result.push(newArray)
  }

  return result
}

/*
  * Делит массив по максимальному числу элементов

  * @param {T} array - массив
  * @param {number} maxLength - максимальное число элементов
  * @returns T[] | [[]]

*/

const formatSimpleSplitArray = <T extends any[]>(
  array: T,
  maxLength: number,
  arrayCount: number
): T[] | [[]] => {
  const result: T[] = []
  for (let index = 0; index < arrayCount; index++) {
    if (!array[index]) {
      console.error(
        `FORMAT formatSplitArray wrong array type; INDEX = ${index}`
      )
      return [[]]
    }

    const newArray = array.slice(
      index * maxLength,
      (index + 1) * maxLength
    ) as T
    result.push(newArray)
  }

  return result
}
