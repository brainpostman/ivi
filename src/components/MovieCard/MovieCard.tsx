import { IMovieCarouselElem } from '@/types/moviecarousel.interface'
import Image from 'next/image'
import React, { FC, forwardRef } from 'react'
import style from './MovieCard.module.scss'
import MovieCarouselControls from './MovieCarouselControls/MovieCarouselControls'
import MovieCarouselInfo from './MovieCarouselInfo/MovieCarouselInfo'

interface IProps {
	movie: IMovieCarouselElem
}

const MovieCard = forwardRef<HTMLDivElement, IProps>(({ movie }, ref) => {
	return (
		<div key={movie.id} className={style.wrapper} ref={ref}>
			<div className={style.wrapperImg}>
				<Image
					src={movie.img}
					alt='movie'
					className={style.img}
					width={153}
					height={235}
				/>
			</div>
			<div className={style.hoverBlock}>
				<MovieCarouselControls />
				<MovieCarouselInfo block={movie} />
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
