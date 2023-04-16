// Ограничиваем количество строк сетки
export const getNumGridColumns = (
	rowsLength: number,
	gridColumnLines: number
) => {
	return Math.round(rowsLength / gridColumnLines)
}
