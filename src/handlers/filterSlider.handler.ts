import { IQueryRange, IRangeWithPartial } from '@/types/utils.interface'

/*
  * Проверяет корректность данных для одиночного слайдера

  * @param {string | IQueryRange} query - параметры
  * @param {IRangeWithPartial} range - диапазон значений
  * @returns boolean

*/

export const handlerFilterSliderSingle = (
  query: string | IQueryRange,
  range: IRangeWithPartial
): boolean => {
  if (typeof query === 'string') {
    if (!('max' in range)) {
      console.error('ERROR: handlerFilterSliderSingle has no maxRange')
      return false
    }

    return true
  }

  return false
}

/*
  * Проверяет корректность данных для парного слайдера

  * @param {string | IQueryRange} query - параметры
  * @param {IRangeWithPartial} range - диапазон значений
  * @returns boolean

*/

export const handlerFilterSliderPaired = (
  query: string | IQueryRange,
  range: IRangeWithPartial
): boolean => {
  if (typeof query !== 'string') {
    if (!('max' in range)) {
      console.error('ERROR: handlerFilterSliderPaired has no maxRange')
      return false
    }

    if (!('min' in query)) {
      console.error('ERROR: handlerFilterSliderPaired has no minQuery')
      return false
    }

    if (!('max' in query)) {
      console.error('ERROR: handlerFilterSliderPaired has no maxQuery')
      return false
    }

    return true
  }

  return false
}
