import { filmsAPI } from '@/api/queries/films.api'
import { ICRUDFilm } from '@/types/ICrudMovie'
import { IMovie, IMovieById } from '@/types/films.api.interface'

const expectedFilmsError = {
  films: [],
  totalCount: 0,
  minYear: 0,
  maxYear: 0,
  minCountScore: 0,
  maxCountScore: 0,
}

describe('FILMS-API ERRORS', () => {
  let errorFilmsData: { films: IMovie[]; totalCount: number }

  let errorFilmById: IMovieById | undefined
  let errorCrudFilmsData: { films: ICRUDFilm[]; totalCount: number }

  beforeAll(async () => {
    errorFilmsData = await filmsAPI.getFilms({ page: -1 })
    errorFilmById = await filmsAPI.getFilmsById(-1)
    errorCrudFilmsData = await filmsAPI.getCrudFilms({ page: -1 })
  })

  // Проверяем ошибку при получении фильмов
  it('Films error', () => {
    expect(errorFilmsData).toStrictEqual(expectedFilmsError)
  })

  // Проверяем ошибку при получении фильма по id
  it('Film by id error', () => {
    expect(errorFilmById).toBeFalsy()
  })

  // Проверяем ошибку при получении круда фильмов
  it('Crud films error', () => {
    expect(errorCrudFilmsData).toStrictEqual(expectedFilmsError)
  })
})
