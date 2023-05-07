import { IFilmsgGetResponse } from '@/types/films.api.interface'

export const transformFilms = (filmsData: Partial<IFilmsgGetResponse>) => {
  const result = {
    ...filmsData,
    countries:
      filmsData.countries?.map(country => country.name).join(',') || '',
    genres: filmsData.genres?.map(genre => genre.name).join(',') || '',
    directors:
      filmsData.directors?.map(director => director.name).join(',') || '',
  }

  return result
}
