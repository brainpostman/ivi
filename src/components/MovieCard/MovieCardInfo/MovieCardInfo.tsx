import { IMovieCard } from '@/types/movieCard.interface'
import { FC } from 'react'
import style from './MovieCardInfo.module.scss'

const formatRating = (rating: string) => {
  const splittedRating = rating.split('.')
  return [splittedRating[0], `,${splittedRating[1]}`]
}

interface IProps {
  block: IMovieCard
}

const MovieCardInfo: FC<IProps> = ({ block }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.rating}>
        {formatRating(block.rating.toFixed(1)).map(el => (
          <span key={el}>{el}</span>
        ))}
      </p>
      <p className={style.bestIndicator}>{block.bestIndicator}</p>
      <p className={style.infoSmall}>
        <span>{block.date}</span>, <span>{block.country}</span>,{' '}
        <span className={style.genre}>{block.genre}</span>
      </p>
      <p>{block.duration}</p>
    </div>
  )
}

export default MovieCardInfo
