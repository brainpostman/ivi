import { IMovie } from '@/types/films.api.interface'
import { FC } from 'react'
import style from './MovieCardInfo.module.scss'

const formatRating = (rating: string) => {
  const splittedRating = rating.split('.')
  return [splittedRating[0], `,${splittedRating[1]}`]
}

interface IProps {
  movie: IMovie
}

const MovieCardInfo: FC<IProps> = ({ movie }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.rating}>
        {formatRating('8.3').map(el => (
          <span key={el}>{el}</span>
        ))}
      </p>
      <div className={style.info_small}>
        <p>{movie.year}</p>
        <p>{movie.countries}</p>
        <p className={style.genre}>{movie.genres}</p>
      </div>
      <p>{movie.time}</p>
    </div>
  )
}

export default MovieCardInfo
