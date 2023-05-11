// === PROPS ===
// @param value { * } - значение для капитализации певрого символа (toUpperCase)
// @param options - параметры
// @param options -> reverse - обратная капитализация первого символа (toLowerCase)

export const formatCapitalize = (
  value: string,
  options?: { reverse?: boolean }
) => {
  const firstLetter = options?.reverse
    ? value[0].toLowerCase()
    : value[0].toUpperCase()

  const otherLetters = value.slice(1)

  return `${firstLetter}${otherLetters}`
}
