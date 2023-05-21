import { IMovie } from '@/types/films.api.interface'
import { createContext } from 'react'

interface IFilms {
  films: IMovie[]
}

const state: IFilms = {
  films: [],
}

export const FilmsContext = createContext(state)
