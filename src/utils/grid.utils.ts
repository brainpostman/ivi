// Ограничиваем количество строк сетки

// === PROPS ===
// @param { * } rowsLength - длина ряда
// @param { * } gridColumnLines - количество колонок

export const getNumGridColumns = (
  rowsLength: number,
  gridColumnLines: number
) => {
  return Math.round(rowsLength / gridColumnLines)
}
