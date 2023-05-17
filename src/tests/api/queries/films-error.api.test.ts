import { filmsAPI } from '@/api/queries/films.api'
import { ICRUDMovie } from '@/types/ICrudMovie'
import { IMovie, IMovieById } from '@/types/films.api.interface'

describe('FILMS API ERRORS', () => {
  let errorFilmsData: { films: IMovie[]; totalCount: number }

  let errorFilmById: IMovieById | undefined
  let errorCrudFilmsData: { films: ICRUDMovie[]; totalCount: number }

  beforeAll(async () => {
    errorFilmsData = await filmsAPI.getFilms({ page: -1 })
    errorFilmById = await filmsAPI.getFilmsById(-1)
    errorCrudFilmsData = await filmsAPI.getCrudFilms({ page: -1 })
  })

  // Проверяем ошибку при получении фильмов
  it('Check films error', () => {
    expect(errorFilmsData).toStrictEqual({ films: [], totalCount: 0 })
  })

  // Проверяем ошибку при получении фильма по id
  it('Check film by id error', () => {
    expect(!errorFilmById).toBeTruthy()
  })

  // Проверяем ошибку при получении круда фильмов
  it('Check crud films error', () => {
    expect(errorCrudFilmsData).toStrictEqual({ films: [], totalCount: 0 })
  })
})
