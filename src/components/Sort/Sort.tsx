import { useSetListParam } from '@/hooks/useSetListParam'
import { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './Sort.module.scss'
import SortDirection from './SortDirection/SortDirection'

const listData = [
  { id: 1, name: 'year', view: 'По годам' },
  { id: 2, name: 'scoreAVG', view: 'По оценкам' },
  { id: 3, name: 'ratingAVG', view: 'По рейтингу' },
  { id: 4, name: 'name', view: 'По алфавиту' },
]

const Sort = () => {
  const [isExpand, setIsExpand] = useState(false)

  const { list: sorts, onClickListEl } = useSetListParam(
    listData.map(data => ({
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

  useEffect(() => {
    onClickListEl('year')()
  }, [])

  if (!currentSort) return <></>

  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setIsExpand(prev => !prev)}>
        <div className={style.lines}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>{currentSort.view}</p>
        <MdArrowBackIosNew
          className={`${style.arrow} ${isExpand ? style.arrow__active : ''}`}
        />
      </div>

      {!!isExpand && (
        <div className={style.wrapper_list}>
          <p className={style.wrapper_list__title}>Сортировать</p>
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

      <SortDirection />
    </div>
  )
}

export default Sort
