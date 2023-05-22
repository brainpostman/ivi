import { customAxios } from '@/api/queries/customAxios'
import { filmsAPI } from '@/api/queries/films.api'
import { transformFilmById } from '@/api/transforms/films.transform'
import { transformFilms } from '@/api/transforms/films.transform'
import { filmsRequiredProperites } from '@/data/requiredProperties.data'
import {
  IFilmByIdGetResponse,
  IFilmsgGetResponse,
  IMovie,
} from '@/types/films.api.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

describe('TRANSFORM transformFilms', () => {
  let films: IMovie[] | undefined

  beforeAll(async () => {
    const filmsData = (await customAxios.get<IFilmsgGetResponse[]>('/films'))
      .data
    const transormedFilms = transformFilms(filmsData)
    films = transormedFilms
  })

  // Обязательные поля
  it('Required properties', () => {
    expect(films).not.toBe(undefined)
    if (!films) return
    films.forEach(film => checkObjHaveProperties(film, filmsRequiredProperites))
  })

  // Типы полей
  it('Property types', () => {
    expect(films).not.toBe(undefined)
    if (!films) return

    films.forEach((film, index) => {
      if (!film) {
        console.error(`transformFilm: film is undefined; ID = ${index}`)
        return
      }
      expect(typeof film.countries).toBe('string')
      expect(typeof film.genres).toBe('string')
    })
  })
})

describe('TRANSFORM ERROR transformFilms', () => {
  // Undefined
  it('Undefined', () => {
    const transformedFilms = transformFilms(undefined)
    expect(transformedFilms).toStrictEqual([])
  })
})

describe('TRANSFORM transformFilmById', () => {
  let film: IFilmByIdGetResponse | undefined

  beforeAll(async () => {
    film = (await customAxios.get(`/films/${1}`)).data
  })

  // Обязательные поля
  it('Required properties', () => {
    expect(film).not.toBe(undefined)
    if (!film) return

    const transformedFilm = transformFilmById(film)
    checkObjHaveProperties(transformedFilm, filmsRequiredProperites)
  })
})

describe('TRANSFORM ERROR transformFilmById', () => {
  // Undefined
  it('Undefined', () => {
    const transformedFilm = transformFilmById(undefined)
    expect(transformedFilm).toBe(undefined)
  })
})
