import { FC } from 'react'
import style from './FilterGenreCard.module.scss'
import { IFilterData } from '@/types/filterBlock.interface'

interface IProps {
  title: string
  onClick: () => void
}

const FilterGenreCard: FC<IProps> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className={style.wrapper}>
      <p>{title}</p>
    </div>
  )
}

export default FilterGenreCard
