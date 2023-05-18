import { Meta, StoryObj } from '@storybook/react'
import Home from '@/pages/index'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'

type Story = StoryObj<typeof Home>

const meta: Meta = {
  title: 'pages/Home',
  parameters: {
    docs: {
      description: {
        component: 'Главная страница',
      },
    },
  },
  component: Home,
  argTypes: {
    firstCarouselFilms: {
      description: 'Фильмы для первой карусели',
    },
    secondCarouselFilms: {
      description: 'Фильмы для второй карусели',
    },
  },
}

export const Primary: Story = {
  render: props => (
    <SessionProvider>
      <Provider store={store}>
        <div style={{ backgroundColor: '#100e19' }}>
          <Home {...props} />
        </div>
      </Provider>
    </SessionProvider>
  ),
  args: {
    firstCarouselFilms: filmsListData.map(film => transformFilms(film)),
    secondCarouselFilms: filmsListData.map(film => transformFilms(film)),
  },
}

export default meta
