import { FC, PropsWithChildren } from 'react'
import style from './FilterGenreCard.module.scss'

interface IProps {
  onClick: () => void
}

const FilterGenreCard: FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={style.wrapper}>
      <p className={style.title}>{children}</p>
    </div>
  )
}

export default FilterGenreCard
