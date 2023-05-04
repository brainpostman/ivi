import { IFilterSliderProps } from '@/types/filterBlock.interface'
import { FC } from 'react'
import FilterSliderPaired from './FilterSliderPaired/FilterSliderPaired'
import FilterSliderSingle from './FilterSliderSingle/FilterSliderSingle'

const FilterSlider: FC<IFilterSliderProps> = ({
  query,
  title,
  range,
  maxValue = 100,
}) => {
  const currentRange = {
    min: range ? range.min : 0,
    max: range ? range.max : 0,
  }

  return (
    <>
      {range ? (
        <FilterSliderPaired
          min={currentRange.min}
          max={currentRange.max}
          query={query}
          title={title}
        />
      ) : (
        <FilterSliderSingle query={query} title={title} maxValue={maxValue} />
      )}
    </>
  )
}

export default FilterSlider
