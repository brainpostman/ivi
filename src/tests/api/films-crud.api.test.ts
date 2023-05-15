import { filmsAPI } from '@/api/queries/films.api'
import { ICrudFilm } from '@/types/ICrudMovie'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'

const filmsRequiredProperties = [
  'id',
  'name',
  'name_en',
  'type',
  'mainImg',
  'year',
  'tagline',
  'budget',
  'fees',
  'feesUS',
  'feesRU',
  'premiere',
  'premiereRU',
  'releaseDVD',
  'releaseBluRay',
  'age',
  'ratingMPAA',
  'time',
  'description',
  'scoreAVG',
  'createdAt',
  'updatedAt',
  'countries',
  'genres',
  'genres_en',
]

describe('FILMS CRUD API', () => {
  let films: ICrudFilm[]

  let errorFilms: ICrudFilm[]
  let errorFilmsTotalCount: number

  beforeAll(async () => {
    const filmsData = await filmsAPI.getCrudFilms()
    films = filmsData.films

    const errorFilmsData = await filmsAPI.getCrudFilms({ page: -1 })
    errorFilms = errorFilmsData.films
    errorFilmsTotalCount = errorFilmsData.totalCount
  })

  // Проверяем поля фильмов
  it('Check crud films properties', () => {
    films.forEach(film => checkObjHaveProperties(film, filmsRequiredProperties))
  })

  it('Check crud films error', () => {
    expect(Array.isArray(errorFilms))

    if (Array.isArray(errorFilms)) {
      expect(!errorFilms.length).toBeTruthy()
    }

    expect(!errorFilmsTotalCount).toBeTruthy()
  })
})
