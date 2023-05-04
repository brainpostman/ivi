import { useSetListParam } from '@/hooks/useSetListParam'
import { useEffect } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import style from './SortDirection.module.scss'

const defaultDirections = [
  { id: 1, name: 'ASC', view: 'Вверх', isSelect: false },
  { id: 2, name: 'DESC', view: 'Вниз', isSelect: false },
]

const SortDirection = () => {
  const { list: directions, onClickListEl } = useSetListParam(
    defaultDirections,
    'order',
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
    onClickListEl('ASC')()
  }, [])

  if (!currentDicrection) return <></>

  return (
    <div
      className={style.wrapper}
      onClick={onClickDirect(nextDirection?.name || '')}
    >
      <GoArrowLeft
        className={currentDicrection?.name === 'DESC' ? style.down : ''}
      />
      <p>{currentDicrection.view}</p>
    </div>
  )
}

export default SortDirection
