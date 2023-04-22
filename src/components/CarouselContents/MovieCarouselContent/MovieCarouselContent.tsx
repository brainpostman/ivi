import { useCustomCarouselContent } from '@/hooks/useCustomCarouselContent'
import { IMovieCarouselElem } from '@/types/moviecarousel.interface'
import Image from 'next/image'
import { FC } from 'react'
import style from './MovieCarouselContent.module.scss'
import MovieCarouselControls from './MovieCarouselControls/MovieCarouselControls'
import MovieCarouselInfo from './MovieCarouselInfo/MovieCarouselInfo'

const MovieCarouselContent: FC<IMovieCarouselElem> = (movie, addElementLen) => {
	const wrapperRef = useCustomCarouselContent(addElementLen)

	return (
		<div key={movie.id} className={style.wrapper} ref={wrapperRef}>
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
}

export default MovieCarouselContent
