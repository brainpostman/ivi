import { customAxios } from '@/api/queries/customAxios'
import { filmsAPI } from '@/api/queries/films.api'
import { staffsAPI } from '@/api/queries/staffs.api'
import {
  CrudDetailedFilm,
  CrudFilm,
  CrudGenre,
  ICrudFilm,
  IDetailedFilmJson,
  IFilmJson,
  IGenreJson,
} from '@/types/ICrudMovie'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'

const crudGenreRequiredProperties = [
  'id',
  'name',
  'name_en',
  'createdAt',
  'updatedAt',
]

const crudFilmRequiredProperties = [
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
  'actors',
  'directors',
  'operators',
  'compositors',
  'artists',
  'montages',
  'scenario',
  'spectators',
]

describe('ICRUDMOVIE', () => {
  let genres: IGenreJson[]
  let film: IDetailedFilmJson

  beforeAll(async () => {
    genres = await staffsAPI.getCrudGenres()
    film = (await customAxios.get<IDetailedFilmJson>(`/films/1`)).data
  })

  it('Check crud genre properties', () => {
    const crudGenres = genres.map(genre => new CrudGenre(genre))
    crudGenres.forEach(crudGenre =>
      checkObjHaveProperties(crudGenre, crudGenreRequiredProperties)
    )
  })

  it('Check crud film properties', () => {
    const crudFilm = new CrudDetailedFilm(film)
    checkObjHaveProperties(crudFilm, crudFilmRequiredProperties)
  })
})
