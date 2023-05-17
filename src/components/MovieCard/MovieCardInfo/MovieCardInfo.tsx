import { IMovie } from '@/types/films.api.interface'
import { FC } from 'react'
import style from './MovieCardInfo.module.scss'
import { formatScores } from '@/formatters/scores.format'

interface IProps {
  movie: IMovie
}

const MovieCardInfo: FC<IProps> = ({ movie }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.scores}>
        {formatScores(movie.countScore).map(el => (
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
