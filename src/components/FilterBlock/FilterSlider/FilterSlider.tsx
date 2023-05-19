import { IFilterSliderProps } from '@/types/filterBlock.interface'
import { FC } from 'react'
import FilterSliderPaired from './FilterSliderPaired/FilterSliderPaired'
import FilterSliderSingle from './FilterSliderSingle/FilterSliderSingle'

const FilterSlider: FC<IFilterSliderProps> = ({ query, title, range }) => {
  return (
    <>
      {'max' in range && typeof query === 'string' ? (
        <FilterSliderSingle
          query={query as string}
          title={title}
          max={range.max}
          min={range.min}
        />
      ) : typeof query !== 'string' &&
        'minQuery' in query &&
        'maxQuery' in query ? (
        <FilterSliderPaired
          min={range.min || 0}
          max={range.max}
          query={query}
          title={title}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default FilterSlider
