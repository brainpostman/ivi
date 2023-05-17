import { customAxios } from '@/api/queries/customAxios'
import { transformFilms } from '@/api/transforms/films.transform'
import { IFilmsgGetResponse } from '@/types/films.api.interface'
import { checkObjHaveProperties } from '@/utils/checkObjHaveProperties.utils'

describe('FILMS TRANSFORM', () => {
  let films: IFilmsgGetResponse[]

  beforeAll(async () => {
    const filmsData = (await customAxios.get<IFilmsgGetResponse[]>('/films'))
      .data
    const transormedFilms = filmsData.map(film => transformFilms(film))
    films = transormedFilms
  })

  it('Check fields are exist', () => {
    films.forEach(film => checkObjHaveProperties(film, []))
  })

  it("Check field's types", () => {
    films.forEach(film => {
      expect(typeof film.countries).toBe('string')
      expect(typeof film.genres).toBe('string')
    })
  })
})
