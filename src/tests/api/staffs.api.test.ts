import { IFilterGetResponse, IStaffGetResponse } from '@/types/staffs.interface'
import { staffsAPI } from '@/api/queries/staffs.api'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'
import { ICrudGenre } from '@/types/ICrudMovie'

const staffRequiredProperties = ['id', 'name']

const crudGenreRequiredProperties = [
  'id',
  'name',
  'name_en',
  'createdAt',
  'updatedAt',
]

describe('STAFFS API', () => {
  let genres: IStaffGetResponse[]
  let countries: IFilterGetResponse[]
  let directors: IStaffGetResponse[]
  let actors: IStaffGetResponse[]

  let crudGenres: ICrudGenre[]

  beforeAll(async () => {
    genres = await staffsAPI.getGenres('ru')
    countries = await staffsAPI.getCountries()
    directors = await staffsAPI.getDirectors()
    actors = await staffsAPI.getActors()
    crudGenres = await staffsAPI.getCrudGenres()
  })

  // Проверка полей жанров
  it('Check genres properties', () => {
    genres.map(genre => checkObjHaveProperties(genre, staffRequiredProperties))
  })

  // Проверка полей стран
  it('Check countries properties', () => {
    countries.map(country =>
      checkObjHaveProperties(country, staffRequiredProperties)
    )
  })

  // Проверка полей режиссёров
  it('Check directors properties', () => {
    directors.map(director =>
      checkObjHaveProperties(director, staffRequiredProperties)
    )
  })

  // Проверка полей актёров
  it('Check actors properties', () => {
    actors.map(actor => checkObjHaveProperties(actor, staffRequiredProperties))
  })

  // Проверка полей круда жанров
  it('Check crud genre properties', () => {
    crudGenres.map(actor =>
      checkObjHaveProperties(actor, crudGenreRequiredProperties)
    )
  })
})

describe('STAFFS API ERRORS', () => {
  let errorGenres: IStaffGetResponse[]
  //let errorCountries: IFilterGetResponse[]
  let errorDirectors: IStaffGetResponse[]
  let errorActors: IStaffGetResponse[]
  let errorCrudGenres: ICrudGenre[]

  beforeAll(async () => {
    errorGenres = await staffsAPI.getGenres('ru', { page: -1 })
    errorDirectors = await staffsAPI.getDirectors({ page: -1 })
    errorActors = await staffsAPI.getActors({ page: -1 })

    errorCrudGenres = await staffsAPI.getCrudGenres({ page: -1 })
  })

  // Проверяем ошибку жанров
  it('Check genres error', () => {
    expect(Array.isArray(errorGenres))

    if (Array.isArray(errorGenres)) {
      expect(!errorGenres.length).toBeTruthy()
    }
  })

  // Проверяем ошибку режиссёров
  it('Check directors error', () => {
    expect(Array.isArray(errorDirectors))

    if (Array.isArray(errorDirectors)) {
      expect(!errorDirectors.length).toBeTruthy()
    }
  })

  // Проверяем ошибку актёров
  it('Check actors error', () => {
    expect(Array.isArray(errorActors))

    if (Array.isArray(errorActors)) {
      expect(!errorActors.length).toBeTruthy()
    }
  })

  // Проверяем ошибку круда жанров
  it('Check actors error', () => {
    expect(Array.isArray(errorCrudGenres))

    if (Array.isArray(errorCrudGenres)) {
      expect(!errorCrudGenres.length).toBeTruthy()
    }
  })
})
