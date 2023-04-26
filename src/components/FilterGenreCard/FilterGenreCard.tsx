import { FC } from 'react'
import style from './FilterGenreCard.module.scss'

interface IProps {
  icon: React.ReactElement
  title: string
}

const FilterGenreCard: FC<IProps> = ({ icon, title }) => {
  return (
    <div className={style.wrapper}>
      {icon}
      <p>{title}</p>
    </div>
  )
}

export default FilterGenreCard
