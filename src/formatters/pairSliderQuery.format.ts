// === PROPS ===
// @param { * } query - название параметра в url

export const formatPairSliderQuery = (query: string) => {
  if (query?.length < 1) {
    return { minValueStr: 'min', maxValueStr: 'max' }
  }

  const firstLetter = query[0].toUpperCase()
  const capitalizedQuery = firstLetter + query.slice(1)
  const minValueStr = `min${capitalizedQuery}`
  const maxValueStr = `max${capitalizedQuery}`

  return { minValueStr, maxValueStr }
}
