import { filmsAPI } from '@/api/queries/films.api'
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

  beforeAll(async () => {
    const filmsData = await filmsAPI.getFilms()
    films = filmsData.films
    totalCount = filmsData.totalCount
    filmById = await filmsAPI.getFilmsById(1)

    homePageFilms = (await filmsAPI.getFilmsHomePage()).films
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
})

describe('FILMS API ERRORS', () => {
  let errorFilms: IMovie[]
  let errorFilmsTotalCount: number

  let errorFilmById: IMovieById | undefined

  beforeAll(async () => {
    const errorFilmsData = await filmsAPI.getFilms({ page: -1 })
    errorFilms = errorFilmsData.films
    errorFilmsTotalCount = errorFilmsData.totalCount

    errorFilmById = await filmsAPI.getFilmsById(-1)
  })

  // Проверяем ошибку при получении фильмов
  it('Check films error', () => {
    expect(Array.isArray(errorFilms))
    if (Array.isArray(errorFilms)) {
      expect(!errorFilms.length).toBeTruthy()
    }

    expect(!errorFilmsTotalCount).toBeTruthy()
  })

  // Проверяем ошибку при получении фильма по id
  it('Check filmy by id error', () => {
    expect(!errorFilmById).toBeTruthy()
  })
})
