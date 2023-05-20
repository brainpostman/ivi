import { FC } from 'react'
import { IFilterSliderProps } from '@/types/filterBlock.interface'
import FilterSliderPaired from './FilterSliderPaired/FilterSliderPaired'
import FilterSliderSingle from './FilterSliderSingle/FilterSliderSingle'
import { getFilterSliderType } from '@/utils/filterSlider.utils'
import { IQueryRange } from '@/types/utils.interface'

const FilterSlider: FC<IFilterSliderProps> = ({ query, title, range }) => {
  const sliderType = getFilterSliderType(query, range)

  return (
    <>
      {sliderType === 'single' ? (
        <FilterSliderSingle
          query={query as string}
          title={title}
          max={range.max}
          min={range.min || 0}
        />
      ) : sliderType === 'paired' ? (
        <FilterSliderPaired
          min={range.min || 0}
          max={range.max}
          query={query as IQueryRange}
          title={title}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default FilterSlider
