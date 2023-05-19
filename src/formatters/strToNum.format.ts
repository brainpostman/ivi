/*
  Преобразует строку в число
  * @param {string | number | undefined} value - значение для форматирования
  * @returns number - отформатированное значение

*/

// Используется для форматированния данных с бэка, поэтому добавил
// дополнительные проверки

const formatStrToNum = (value: string | number | undefined): number => {
  if (!value) {
    console.error('Wrong value for formatStrToNum')
    return 0
  }

  if (typeof value === 'number') return value

  const formattedValue = Number(value)

  if (Number.isNaN(formattedValue)) {
    console.error('Wrong formattedValue in formatStrToNum')
    return 0
  }
  console.log(formattedValue)
  return formattedValue
}

export default formatStrToNum
