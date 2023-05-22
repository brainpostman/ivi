import formatFilterToNames from '@/formatters/filterToNames.format'
import { formatImgUrl } from '@/formatters/imgUrl.format'
import formatScoreAVG from '@/formatters/scoreAVG.format'
import {
  IFilmByIdGetResponse,
  IFilmsgGetResponse,
  IMovie,
  IMovieById,
} from '@/types/films.api.interface'

/*
  * Преобразует данные о фильмах
  * @param {extends IFilmsgGetResponse[] | undefined} filmsData - данные о 
    фильмах
  * @returns IMovie[] - преобразованные данные о фильмах

*/

export const transformFilms = (
  filmsData: IFilmsgGetResponse[] | undefined
): IMovie[] => {
  if (!filmsData) return []

  const result: IMovie[] = filmsData.map(film => ({
    ...film,
    mainImg: formatImgUrl(film.mainImg),
    countries: formatFilterToNames(film.countries),
    genres: formatFilterToNames(film.genres),
    scoreAVG: formatScoreAVG(film.scoreAVG),
  }))

  return result
}

/*
  * Преобразует данные о фильме по id
  * @param {IFilmByIdGetResponse | undefined} - данные о фильме
  * @returns IMovieById | undefined - преобразованные данные о фильме

*/

export const transformFilmById = (
  filmData: IFilmByIdGetResponse | undefined
): IMovieById | undefined => {
  if (!filmData) return undefined

  const result: IMovieById = {
    ...filmData,
    mainImg: formatImgUrl(filmData.mainImg),
    countries: formatFilterToNames(filmData.countries),
    genres: formatFilterToNames(filmData.genres),
    scoreAVG: formatScoreAVG(filmData.scoreAVG),
  }

  return result
}
