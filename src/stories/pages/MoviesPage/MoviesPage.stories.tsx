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

type Story = StoryObj<typeof MoviesPage>

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
  argTypes: {},
}

export const Primary: Story = {
  render: props => (
    <SessionProvider>
      <Provider store={store}>
        <MoviesPage {...props} />
      </Provider>
    </SessionProvider>
  ),
  args: {
    defaultFilms: filmsListData.map(film => transformFilms(film)),
    actors: filterActorData,
    directors: filterDirectorData,
    countries: filterCountryListData,
    genres: filterGenreListData,
    totalCount: 0,
  },
}

export default meta
