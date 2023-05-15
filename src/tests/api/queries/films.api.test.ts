import { filmsAPI } from '@/api/queries/films.api'
import { ICRUDMovie } from '@/types/ICrudMovie'
import { IMovieById } from '@/types/films.api.interface'
import { IMovie } from '@/types/films.api.interface'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'

const filmsRequiredProperites = [
  'id',
  'name',
  'name_en',
  'year',
  'countries',
  'genres',
  'tagline',
  'scoreAVG',
  'age',
  'description',
  'mainImg',
  'time',
  'premiereRU',
  'premiere',
]

const crudFilmsRequiredProperties = [
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
]

const specificFilmRequiredProperites = [
  ...filmsRequiredProperites,
  'directors',
  'artists',
  'actors',
  'montages',
  'compositors',
  'scenario',
  'operators',
]

// Тестируем API фильмов
describe('API-FILMS', () => {
  let films: IMovie[]
  let totalCount: number
  let filmById: IMovieById | undefined
  let homePageFilms: IMovie[]

  let crudFilms: ICRUDMovie[]

  beforeAll(async () => {
    const filmsData = await filmsAPI.getFilms()
    films = filmsData.films
    totalCount = filmsData.totalCount
    filmById = await filmsAPI.getFilmsById(1)

    homePageFilms = (await filmsAPI.getFilmsHomePage()).films
    crudFilms = (await filmsAPI.getCrudFilms()).films
  })

  // Проверяем поля пришедших фильмов
  it('Check films properties', () => {
    films.forEach(film => checkObjHaveProperties(film, filmsRequiredProperites))
  })

  //it('Check films totalCount', () => {
  //  console.log(`totalCount = ${totalCount}`)
  //  expect(totalCount).toBeTruthy()

  //  const checkType = typeof totalCount === 'number'
  //  expect(checkType).toBeTruthy()
  //})

  // Проверяем поля фильма, полученного по id
  it('Check film by id properites', () => {
    expect(filmById).toBeTruthy()

    if (filmById) {
      checkObjHaveProperties(filmById, specificFilmRequiredProperites)
    }
  })

  // Проверяем фильмы на главной странице
  it('Check films on home page', () => {
    expect(homePageFilms).toBeTruthy()

    expect(homePageFilms.length === 19).toBeTruthy()
  })

  // Проверяем круд фильмов
  it('Check crud films', () => {
    expect(crudFilms).toBeTruthy()

    crudFilms.forEach(crudFilm =>
      checkObjHaveProperties(crudFilm, crudFilmsRequiredProperties)
    )
  })
})

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
