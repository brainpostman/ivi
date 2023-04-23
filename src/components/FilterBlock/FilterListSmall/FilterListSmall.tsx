import { useSetListParam } from '@/hooks/useSetListParam'
import {
  IFilterBlockEl,
  IFilterListEl,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { FC, useState } from 'react'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListSmall.module.scss'

interface IProps {
  title: IFilterTitle
  selectFilter: () => void
  filter?: IFilterBlockEl
  list: Omit<IFilterListEl, 'isSelect'>[]
  query: string
}

const FilterListSmall: FC<IProps> = ({
  title,
  selectFilter,
  filter,
  list: listData,
  query,
}) => {
  const { onClickListEl, param, list } = useSetListParam(
    listData.map((el, index) => ({ ...el, isSelect: !index })),
    query,
    { filterType: 'radio', extraValues: ['all'] }
  )

  return (
    <FilterTab
      title={title}
      selectFilter={selectFilter}
      filter={filter}
      paramValue={param}
    >
      {filter?.isExpand && (
        <div className={style.wrapper}>
          <ul className={style.list}>
            {list.map(item => (
              <li key={item.title} onClick={onClickListEl(item.param)}>
                <p className={item.isSelect ? style.title__active : ''}>
                  {item.title}
                </p>
                <div
                  className={`${style.circle} ${
                    item.isSelect && style.circle__active
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </FilterTab>
  )
}

export default FilterListSmall
