import { useSetListParam } from '@/hooks/useSetListParam'
import { useEffect, useRef, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './Sort.module.scss'
import SortDirection from './SortDirection/SortDirection'
import { ISortType } from '@/types/filterBlock.interface'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useOutside from '@/hooks/useOutside'

interface ISortProps {
  sortTypes: ISortType[]
  defaultSort: string
}

const Sort = ({ sortTypes, defaultSort }: ISortProps) => {
  const [isExpand, setIsExpand] = useState(false)
  const { t } = useTranslation('movies')
  const router = useRouter()

  const ref = useRef<HTMLInputElement>(null)

  const { list: sorts, onClickListEl } = useSetListParam(
    sortTypes.map(data => ({
      ...data,
      isSelect: false,
    })),
    'orderBy',
    { filterType: 'radio' }
  )

  const currentSort = sorts.find(el => el.isSelect)

  const onClickListElModif = (_param: string) => () => {
    onClickListEl(_param)()
    setIsExpand(false)
  }

  useOutside(ref, () => setIsExpand(false), isExpand)

  return (
    <div className={style.wrapper} ref={ref}>
      <div className={style.title} onClick={() => setIsExpand(prev => !prev)}>
        <div className={style.lines}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>{currentSort ? currentSort.view : t('sort')}</p>
        <MdArrowBackIosNew
          className={`${style.arrow} ${isExpand ? style.arrow__active : ''}`}
        />
      </div>

      {!!isExpand && (
        <div className={style.wrapper_list}>
          <p className={style.wrapper_list__title}>{t('sort')}</p>
          <ul className={style.list}>
            {sorts.map(sort => (
              <li
                key={sort.id}
                className={sort.isSelect ? style.active : ''}
                onClick={onClickListElModif(sort.name)}
              >
                {sort.view}
              </li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(router.query).includes('orderBy') && <SortDirection />}
    </div>
  )
}

export default Sort
