/*
  * @param {string | null} value - значение для капитализации певрого символа 
  (toUpperCase)
  * @param {IFormatCapitalizeOptions} options - параметры
    options -> reverse - обратная капитализация первого символа (toLowerCase)
  * @returns string - строка с обработанным первым символом
*/

interface IFormatCapitalizeOptions {
  reverse?: boolean
}

export const formatCapitalize = (
  value?: string | null,
  options?: IFormatCapitalizeOptions
): string => {
  if (!value) return ''

  const firstLetter = options?.reverse
    ? value[0].toLowerCase()
    : value[0].toUpperCase()

  const otherLetters = value.slice(1)

  return `${firstLetter}${otherLetters}`
}
