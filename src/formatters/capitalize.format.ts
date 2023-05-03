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
