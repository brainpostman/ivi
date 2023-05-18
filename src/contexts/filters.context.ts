import { IFilterGetResponse } from '@/types/filters.interface'
import { createContext } from 'react'

interface IFilters {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
}

const state: IFilters = {
  genres: [],
  countries: [],
}

export const FiltersContext = createContext(state)
