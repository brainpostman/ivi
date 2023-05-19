import { IFilterGetResponse } from '@/types/filters.interface'

/*
  Преобразует массив строк в список фильтров

  * @param {string[]} filterNames - названия пунктов фильтра
  * @returns IFilterGetResponse[] - отформатированный список пунктов

*/

const formatStringArrToFilters = (
  filterNames: string[]
): IFilterGetResponse[] => {
  const resultFilters: IFilterGetResponse[] = filterNames.map(
    (filter, index) => ({
      id: index + 1,
      name: filter,
    })
  )

  return resultFilters
}

export default formatStringArrToFilters
