interface IMinMaxQuery {
  minValueStr: string
  maxValueStr: string
}

/*
  * @param {string} query - название параметра в url
  * @returns {IMinMaxQuery} - названия параметров для максимума и минимума

*/

export const formatMinMaxQuery = (query: string): IMinMaxQuery => {
  if (query?.length < 1) {
    return { minValueStr: 'min', maxValueStr: 'max' }
  }

  const firstLetter = query[0].toUpperCase()
  const capitalizedQuery = firstLetter + query.slice(1)
  const minValueStr = `min${capitalizedQuery}`
  const maxValueStr = `max${capitalizedQuery}`

  return { minValueStr, maxValueStr }
}
