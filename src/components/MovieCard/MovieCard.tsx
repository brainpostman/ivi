import { IMovieCard } from '@/types/movieCard.interface'
import Image from 'next/image'
import React, { FC, forwardRef } from 'react'
import style from './MovieCard.module.scss'
import MovieCardControls from './MovieCardControls/MovieCardControls'
import MovieCardInfo from './MovieCardInfo/MovieCardInfo'

interface IProps {
  movie: IMovieCard
}

const MovieCard = forwardRef<HTMLDivElement, IProps>(({ movie }, ref) => {
  return (
    <div key={movie.id} className={style.wrapper} ref={ref}>
      <div className={style.wrapper_img}>
        <Image src={movie.img} alt='movie' className={style.img} fill />
      </div>
      <div className={style.hoverBlock}>
        <MovieCardControls />
        <MovieCardInfo block={movie} />
      </div>
      <div>
        <p className={style.infoTitle}>{movie.title}</p>
        <p
          className={
            movie.isFree
              ? style.infoSubtitle
              : `${style.infoSubtitle} ${style.notFree}`
          }
        >
          {movie.isFree ? 'Бесплатно' : 'Подписка'}
        </p>
      </div>
    </div>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
