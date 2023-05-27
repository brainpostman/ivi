import { FC, PropsWithChildren } from 'react'
import style from './FilterGenreCard.module.scss'

interface IProps {
  onClick: () => void
  className?: string
}

const FilterGenreCard: FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <div onClick={onClick} className={`${style.wrapper} ${className}`}>
      <p className={style.title}>{children}</p>
    </div>
  )
}

export default FilterGenreCard
