import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import { useGetParam } from '@/hooks/useGetParam'
import { useSetListParam } from '@/hooks/useSetListParam'
import {
  IFilterBlockEl,
  IFilterListEl,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListBig.module.scss'

interface IProps {
  title: IFilterTitle
  selectFilter: () => void
  filter?: IFilterBlockEl
  carouselData: any[]
  list: Omit<IFilterListEl, 'isSelect'>[]
  carouselContent: FC<any>
  carouselElementsView?: number
  carouselElementsMove?: number
  query: string
}

const FilterListBig: FC<IProps> = ({
  title,
  selectFilter,
  filter,
  carouselData,
  list: listData,
  carouselContent,
  carouselElementsView = 5,
  carouselElementsMove = 2,
  query,
}) => {
  const { list, onClickListEl, param } = useSetListParam(
    listData.map(data => ({ ...data, isSelect: false })),
    query
  )

  return (
    <FilterTab
      title={title}
      selectFilter={selectFilter}
      filter={filter}
      paramValue={param}
    >
      {filter?.isExpand && (
        <div className={style.container}>
          <CustomCarousel
            children={carouselContent}
            elementsMove={carouselElementsMove}
            elementsView={carouselElementsView}
            arrowSize={18}
            space={12}
            data={carouselData}
            classNameWrapper={style.carousel_wrapper}
            width='fit'
          />

          <ul className={style.list}>
            {list.map(el => (
              <li
                key={el.title}
                onClick={onClickListEl(el.param)}
                className={el.isSelect ? style.active : ''}
              >
                <p>{el.title}</p>
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
