import { formatImgUrl } from '@/formatters/imgUrl.format'
import { IFilmsgGetResponse } from '@/types/films.api.interface'

export const transformFilms = <T extends IFilmsgGetResponse>(filmsData: T) => {
  const result = {
    ...filmsData,
    mainImg: formatImgUrl(filmsData.mainImg),
    countries:
      filmsData.countries?.map(country => country.name).join(',') || '',
    genres: filmsData.genres?.map(genre => genre.name).join(',') || '',
  }

  return result
}
