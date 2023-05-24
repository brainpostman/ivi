import { filmsAPI } from '@/api/queries/films.api'
import {
  crudFilmsRequiredProperties,
  filmsRequiredProperites,
  specificFilmRequiredProperites,
} from '@/data/requiredProperties.data'
import { ICRUDFilm } from '@/types/ICrudMovie'
import { IMovieById } from '@/types/films.api.interface'
import { IMovie } from '@/types/films.api.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

// Тестируем API фильмов
describe('API-FILMS', () => {
  let films: (IMovie | undefined)[]
  let totalCount: number
  let filmById: IMovieById | undefined

  let crudFilms: ICRUDFilm[]

  beforeAll(async () => {
    const filmsData = await filmsAPI.getFilms('ru')
    films = filmsData.films
    totalCount = filmsData.totalCount
    filmById = await filmsAPI.getFilmsById('ru', 1)

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

  // Проверяем круд фильмов
  it('Crud films', () => {
    expect(crudFilms).toBeTruthy()

    crudFilms.forEach(crudFilm =>
      checkObjHaveProperties(crudFilm, crudFilmsRequiredProperties)
    )
  })
})
