import { handlerFilterSliderPaired } from '@/handlers/filterSlider.handler'
import { handlerFilterSliderSingle } from '@/handlers/filterSlider.handler'
import {
  IFilterSliderType,
  IQueryRange,
  IRangeWithPartial,
} from '@/types/utils.interface'

export const getFilterSliderType = (
  query: string | IQueryRange,
  range: IRangeWithPartial
): IFilterSliderType => {
  const checkSliderSingle = handlerFilterSliderSingle(query, range)
  const checkSliderPaired = handlerFilterSliderPaired(query, range)

  const result: IFilterSliderType = checkSliderSingle
    ? 'single'
    : checkSliderPaired
    ? 'paired'
    : undefined

  return result
}
