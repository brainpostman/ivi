/*
  * Возвращает класс, либо пустую строку в зависимости от наличия фильтра в url

  * @param {string} filter - фильтр
  * @param {string} className - класс
  * @param {string | undeifned} urlFilter - фильтр из url
   
  * @returns string - класс / пустая строка

*/

const getFilterClassName = (
  filter: string,
  className: string,
  urlFilter: string | string[] | undefined
): string => {
  if (!urlFilter) return ''

  const arrayUrlFilter = Array.isArray(urlFilter)
    ? urlFilter.filter(filter => !!filter)
    : [urlFilter]

  const isIncludeCurrentFilter = arrayUrlFilter.some(urlFilter =>
    urlFilter.split(',').some(query => query === filter)
  )

  return isIncludeCurrentFilter ? className : ''
}

export default getFilterClassName
