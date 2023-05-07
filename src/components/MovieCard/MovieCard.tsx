import { IMovie } from '@/types/films.api.interface'
import Image from 'next/image'
import React, { FC } from 'react'
import style from './MovieCard.module.scss'
import MovieCardControls from './MovieCardControls/MovieCardControls'
import MovieCardInfo from './MovieCardInfo/MovieCardInfo'

interface IProps {
  movie: IMovie
}

const MovieCard: FC<IProps> = ({ movie }) => {
  return (
    <div key={movie.id} className={style.wrapper}>
      <div className={style.wrapper_img}>
        <Image
          src={`http://${movie.mainImg}`}
          alt='movie'
          className={style.img}
          fill
        />
      </div>
      <div className={style.hoverBlock}>
        <MovieCardControls />
        <MovieCardInfo movie={movie} />
      </div>
      <p className={style.info__title}>{movie.name}</p>
    </div>
  )
}

export default MovieCard
