import { IMovieCarouselElem } from '@/types/moviecarousel.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import style from './MovieCardGrid.module.scss'

interface IProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	movies: IMovieCarouselElem[]
}

const MovieCardGrid: FC<IProps> = ({ movies, className, ...props }) => {
	return (
		<ul className={`${style.wrapper} ${className}`} {...props}>
			{movies.map(movie => (
				<li key={movie.id}>
					<MovieCard movie={movie} />
				</li>
			))}
		</ul>
	)
}

export default MovieCardGrid
