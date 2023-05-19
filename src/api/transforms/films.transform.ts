import formatFilterToNames from '@/formatters/filterToNames.format'
import { formatImgUrl } from '@/formatters/imgUrl.format'
import formatScoreAVG from '@/formatters/scoreAVG.format'
import { IFilmsgGetResponse, IMovie } from '@/types/films.api.interface'

/*
  * Преобразует данные о фильме
  * @param {extends IFilmsgGetResponse} filmsData - данные о фильме
  * @returns ITransformFilms - преобразованные данные о фильме

*/

type ITransformFilms<T> = T & IMovie

export const transformFilms = <T extends IFilmsgGetResponse>(
  filmsData: T
): ITransformFilms<T> => {
  const result = {
    ...filmsData,
    mainImg: formatImgUrl(filmsData.mainImg),
    countries: formatFilterToNames(filmsData.countries),
    genres: formatFilterToNames(filmsData.genres),
    scoreAVG: formatScoreAVG(filmsData.scoreAVG),
  }

  return result
}
