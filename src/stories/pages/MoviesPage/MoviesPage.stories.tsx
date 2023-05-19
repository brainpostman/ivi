import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import MoviesPage from '@/pages/movies'
import { filterGenreListData } from '@/data/filterGenre.data'
import { filterCountryListData } from '@/data/filterCountry.data'
import { filterDirectorData } from '@/data/filterDirectordata'
import { filterActorData } from '@/data/filterActor.data'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'
import formatStringArrToStaff from '@/formatters/stringArrToStaff.format'
import formatStringArrToFilters from '@/formatters/stringArrToFilters.format'
import { IMovie } from '@/types/films.api.interface'

const meta: Meta = {
  title: 'pages/MoviesPage',
  parameters: {
    docs: {
      description: {
        component: 'Страница фильмов',
      },
    },
  },
  component: MoviesPage,
  argTypes: {
    defaultFilms: { table: { disable: true } },
    totalCount: { table: { disable: true } },
    actors: {
      description: 'Список актёров (через запятую)',
    },
    directors: {
      description: 'Список режиссёров (через запятую)',
    },
    genres: {
      description: 'Список жанров (через запятую)',
    },
    countries: {
      description: 'Список стран (через запятую)',
    },
  },
}

interface IPrimary {
  actors: string
  directors: string
  genres: string
  countries: string
  defaultFilms: IMovie[]
  totalCount: number
  minYear: number
  maxYear: number
  minCountScore: number
  maxCountScore: number
}

export const Primary = ({
  actors: actorsIncoming,
  countries: countriesIncoming,
  directors: directorsIncoming,
  genres: genresIncoming,
  ...props
}: IPrimary) => {
  const actors = formatStringArrToStaff(actorsIncoming.split(','), 'actor')
  const directors = formatStringArrToStaff(
    directorsIncoming.split(','),
    'director'
  )
  const countries = formatStringArrToFilters(countriesIncoming.split(','))
  const genres = formatStringArrToFilters(genresIncoming.split(','))

  return (
    <SessionProvider>
      <Provider store={store}>
        <MoviesPage
          actors={actors}
          directors={directors}
          countries={countries}
          genres={genres}
          {...props}
        />
      </Provider>
    </SessionProvider>
  )
}

Primary.args = {
  actors: 'actor1',
  directors: 'director1',
  countries: 'country1',
  genres: 'genre1',
  defaultFilms: filmsListData.map(film => transformFilms(film)),
  totalCount: filmsListData.length,
  minYear: 1996,
  maxYear: 2023,
  minCountScore: 74396,
  maxCountScore: 497326,
}

export default meta
