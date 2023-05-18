import { filmsAPI } from '@/api/queries/films.api'
import { ICRUDMovie } from '@/types/ICrudMovie'
import { IMovieById } from '@/types/films.api.interface'
import { IMovie } from '@/types/films.api.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

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
  it('Films properties', () => {
    films.forEach(film => checkObjHaveProperties(film, filmsRequiredProperites))
  })

  //it('Check films totalCount', () => {
  //  console.log(`totalCount = ${totalCount}`)
  //  expect(totalCount).toBeTruthy()

  //  const checkType = typeof totalCount === 'number'
  //  expect(checkType).toBeTruthy()
  //})

  // Проверяем поля фильма, полученного по id
  it('Film by id properites', () => {
    expect(filmById).toBeTruthy()

    if (filmById) {
      checkObjHaveProperties(filmById, specificFilmRequiredProperites)
    }
  })

  // Проверяем фильмы на главной странице
  it('Films on home page', () => {
    expect(homePageFilms).toBeTruthy()

    expect(homePageFilms.length === 19).toBeTruthy()
  })

  // Проверяем круд фильмов
  it('Crud films', () => {
    expect(crudFilms).toBeTruthy()

    crudFilms.forEach(crudFilm =>
      checkObjHaveProperties(crudFilm, crudFilmsRequiredProperties)
    )
  })
})
