import { IMovie } from '@/types/api/films.api.interface'
import style from './FilmFields.module.scss'
import { FC } from 'react'
import { formatCapitalize } from '@/formatters/capitalize.format'

interface IProps {
  film: IMovie
  className?: string
}

const FilmFields: FC<IProps> = ({ film, className = '' }) => {
  const specificCountry = film.countries.split(',')[0]
  const formattedGenres = film.genres
    .split(',')
    .map(genre => formatCapitalize(genre))

  return (
    <div className={`${style.wrapper} ${className}`}>
      <p>
        <span className={style.filter}>{film.year}</span> {film.time} {film.age}
      </p>
      <span className={style.filter}>{specificCountry}</span>
      <ul className={style.genre_list}>
        {formattedGenres.map(genre => (
          <li key={genre}>
            <p className={style.filter}>{genre}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilmFields
