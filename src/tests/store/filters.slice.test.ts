import { IFilterGetResponse } from '@/types/filters.interface'
import { filtersSlice } from '@/store/slices/filters.slice'

interface IState {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
}

const testGenres = [
  { id: 1, name: 'genre1' },
  { id: 2, name: 'genre2' },
]

const testCountries = [
  { id: 1, name: 'country1' },
  { id: 2, name: 'country2' },
]

const testResultSlice: IState = {
  genres: testGenres,
  countries: testCountries,
}

jest.mock('react-redux')

const { setFilters } = filtersSlice.actions

const state: IState = {
  genres: [],
  countries: [],
}

const getAction = (payload: Partial<IState>) => ({
  type: setFilters.type,
  payload,
})

describe('STORE FILTERS', () => {
  // Проверяем состояние слайса по умолчанию
  it("Check default slice's state", () => {
    const slice = filtersSlice.reducer(state, getAction({}))

    expect(slice).toStrictEqual(state)
  })

  // Передаём жанры и страны
  it('Check set genres & countries', () => {
    const slice = filtersSlice.reducer(
      state,
      getAction({ genres: testGenres, countries: testCountries })
    )

    expect(slice).toStrictEqual(testResultSlice)
  })

  // Передаём только жанры
  it('Check set genres only', () => {
    const slice = filtersSlice.reducer(
      { genres: [], countries: testCountries },
      getAction({ genres: testGenres })
    )

    expect(slice).toStrictEqual(testResultSlice)
  })

  // Передаём только страны
  it('Check set countries only', () => {
    const slice = filtersSlice.reducer(
      { genres: testGenres, countries: [] },
      getAction({ countries: testCountries })
    )

    expect(slice).toStrictEqual(testResultSlice)
  })
})
