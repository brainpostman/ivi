import { FC } from 'react'
import style from './FilterGenreCard.module.scss'

interface IProps {
  title: string
}

const FilterGenreCard: FC<IProps> = ({ title }) => {
  return (
    <div className={style.wrapper}>
      <p>{title}</p>
    </div>
  )
}

export default FilterGenreCard
