import { useSetListParam } from '@/hooks/useSetListParam'
import { useEffect } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import style from './SortDirection.module.scss'

const defaultDirections = [
  { title: 'Вверх', param: 'asc', isSelect: false },
  { title: 'Вниз', param: 'desc', isSelect: false },
]

const SortDirection = () => {
  const { list: directions, onClickListEl } = useSetListParam(
    defaultDirections,
    'direct',
    {
      filterType: 'radio',
    }
  )

  const currentDicrection = directions.find(el => el.isSelect)
  const nextDirection = directions.find(el => !el.isSelect)

  const onClickDirect = (_param: string) => () => {
    onClickListEl(_param)()
  }

  useEffect(() => {
    onClickListEl('asc')()
  }, [])

  if (!currentDicrection) return <></>

  return (
    <div
      className={style.wrapper}
      onClick={onClickDirect(nextDirection?.param || '')}
    >
      <GoArrowLeft
        className={currentDicrection?.param === 'desc' ? style.down : ''}
      />
      <p>{currentDicrection?.title}</p>
    </div>
  )
}

export default SortDirection
