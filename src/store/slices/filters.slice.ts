import { IFilterGetResponse } from '@/types/filters.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IState {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
}

const initialState: IState = {
  genres: [],
  countries: [],
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<IState>>) => {
      const countries = action.payload.countries
      const genres = action.payload.genres
      if (countries) {
        state.countries = countries
      }
      if (genres) {
        state.genres = genres
      }
    },
  },
})
