import { IFilmsgGetResponse, IMovie } from '@/types/films.api.interface'
import { IMovieCard } from '@/types/movieCard.interface'
import Image from 'next/image'
import React, { FC, forwardRef } from 'react'
import style from './MovieCard.module.scss'
import MovieCardControls from './MovieCardControls/MovieCardControls'
import MovieCardInfo from './MovieCardInfo/MovieCardInfo'

interface IProps {
  movie: IMovie
}

const MovieCard = forwardRef<HTMLDivElement, IProps>(({ movie }, ref) => {
  return (
    <div key={movie.id} className={style.wrapper} ref={ref}>
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
      <div className={style.info}>
        <p className={style.info__title}>{movie.name}</p>
      </div>
    </div>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
