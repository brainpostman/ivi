import FilterSlider from '@/components/FilterBlock/FilterSlider/FilterSlider'
import {
  IFilterSliderType,
  IQueryRange,
  IRangeWithPartial,
} from '@/types/utils.interface'
import { FC } from 'react'

interface IProps {
  title: string
  querySingle: string
  queryPaired: IQueryRange
  minRange: number
  maxRange: number
  typeSlider: IFilterSliderType
}

const FilterSliderModif: FC<IProps> = ({
  typeSlider,
  maxRange,
  minRange,
  queryPaired,
  querySingle,
  title,
}) => {
  const query: string | IQueryRange =
    typeSlider === 'single'
      ? querySingle
      : {
          min: queryPaired.min,
          max: queryPaired.max,
        }

  const range: IRangeWithPartial = {
    min: minRange,
    max: maxRange,
  }

  return (
    <div style={{ width: 250 }}>
      <FilterSlider title={title} query={query} range={range} />
    </div>
  )
}

export default FilterSliderModif
