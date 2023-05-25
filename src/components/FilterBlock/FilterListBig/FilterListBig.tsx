import CustomCarousel from '@/components/UI/Carousels/CustomCarousel/CustomCarousel'
import { useSetListParam } from '@/hooks/useSetListParam'
import { IFilterListBigProps } from '@/types/filterBlock.interface'
import { FC, useRef } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListBig.module.scss'
import useOutside from '@/hooks/useOutside'

const FilterListBig: FC<IFilterListBigProps> = ({
  filterData,
  list: listData,
  carouselElementsView = 5,
  carouselElementsMove = 2,
  query,
  children,
}) => {
  const { list, onClickListEl, param } = useSetListParam(
    listData ? listData.map(data => ({ ...data, isSelect: false })) : [],
    query
  )

  const { filter, selectFilter } = filterData

  const ref = useRef<HTMLDivElement>(null)

  useOutside(ref, selectFilter, filter?.isExpand)

  return (
    <FilterTab
      selectFilter={selectFilter}
      filter={filter}
      paramValue={param}
      elementRef={ref}
    >
      {filter?.isExpand && (
        <div className={style.container}>
          {children && (
            <CustomCarousel
              elementsMove={carouselElementsMove}
              elementsView={carouselElementsView}
              arrowSize={18}
              space={[12, 12]}
              classNameWrapper={style.carousel_wrapper}
              width='fit'
            >
              {children}
            </CustomCarousel>
          )}

          <ul className={style.list}>
            {list.map(el => (
              <li
                key={el.id}
                onClick={onClickListEl(el.name)}
                className={el.isSelect ? style.active : ''}
              >
                <p>{el.name}</p>
                <BsCheckLg />
              </li>
            ))}
          </ul>
        </div>
      )}
    </FilterTab>
  )
}

export default FilterListBig
