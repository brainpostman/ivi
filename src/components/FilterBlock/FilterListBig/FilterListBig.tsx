import CustomCarousel from '@/components/UI/Carousels/CustomCarousel/CustomCarousel'
import { useSetListParam } from '@/hooks/useSetListParam'
import { IFilterListBigProps } from '@/types/filterBlock.interface'
import { FC, useRef } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListBig.module.scss'
import useOutside from '@/hooks/useOutside'
import checkEnLang from '@/utils/checkEnLang.utils'

const FilterListBig: FC<IFilterListBigProps> = ({
  filterData,
  list: listData,
  carouselElementsView = 5,
  carouselElementsMove = 2,
  query,
  enQuery,
  children,
}) => {
  const {
    list: listRu,
    onClickListEl: onClickListElRu,
    param: paramRu,
  } = useSetListParam(
    listData ? listData.map(data => ({ ...data, isSelect: false })) : [],
    query
  )

  const {
    list: listEn,
    onClickListEl: onClickListElEn,
    param: paramEn,
  } = useSetListParam(
    listData ? listData.map(data => ({ ...data, isSelect: false })) : [],
    enQuery
  )

  const onClickFilter = (_param: string): (() => void) => {
    const isEng = checkEnLang(_param)
    if (isEng) return onClickListElEn(_param)

    return onClickListElRu(_param)
  }

  const getList = () => {
    const result = []
    for (let index = 0; index < listRu.length; index++) {
      const resultListEl = {
        ...listRu[index],
        isSelect: listRu[index].isSelect || listEn[index].isSelect,
      }

      result.push(resultListEl)
    }

    return result
  }

  const { filter, selectFilter } = filterData

  const ref = useRef<HTMLDivElement>(null)

  useOutside(ref, selectFilter, filter?.isExpand)

  return (
    <FilterTab
      selectFilter={selectFilter}
      filter={filter}
      paramValue={[paramRu, paramEn]}
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
            {getList()?.map(el => (
              <li
                key={el.id}
                onClick={onClickFilter(el.name)}
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
