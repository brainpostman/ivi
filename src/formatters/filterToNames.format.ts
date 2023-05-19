import { IFilterGetResponse } from '@/types/filters.interface'

/*
  * Преобразует фильтр: вытаскивает из него названия и склеивает в строку
  * @param {IFilterGetResponse} filter - фильтр
  * @returns string - названия

*/

const formatFilterToNames = (
  filter: IFilterGetResponse[] | undefined
): string => {
  if (!filter) {
    console.error('Wrong filters value {undefined}')
    return ''
  }

  const filteredValue = filter.filter(fi => {
    if (!fi.name) {
      console.error(`Wrong filter.name value {undefined}; ID = ${fi.id}`)
      return
    }

    return !!fi.name
  })

  const formattedValue = filteredValue.map(fi => fi.name)
  const result = formattedValue.join(',')

  return result
}

export default formatFilterToNames
