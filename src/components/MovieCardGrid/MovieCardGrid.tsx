import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import MovieCard from '../UI/Cards/MovieCard/MovieCard'
import style from './MovieCardGrid.module.scss'
import { IMovie } from '@/types/api/films.api.interface'

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  movies: IMovie[]
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
