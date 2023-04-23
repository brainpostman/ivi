import MovieCard from '@/components/MovieCard/MovieCard'
import { useCustomCarouselContent } from '@/hooks/useCustomCarouselContent'
import { IMovieCarouselElem } from '@/types/moviecarousel.interface'
import { FC } from 'react'

const MovieCarouselContent: FC<IMovieCarouselElem> = (movie, addElementLen) => {
	const wrapperRef = useCustomCarouselContent(addElementLen)

	return <MovieCard movie={movie} ref={wrapperRef} />
}

export default MovieCarouselContent
