// Ограничиваем количество строк сетки

/*
  * @param {number} rowsLength - длина ряда
  * @param {number} gridColumnLines - количество колонок
  * @returns number

*/

export const getNumGridColumns = (
  rowsLength: number,
  gridColumnLines: number
): number => {
  return Math.round(rowsLength / gridColumnLines)
}
