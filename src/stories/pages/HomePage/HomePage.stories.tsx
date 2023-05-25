import { Meta, StoryObj } from '@storybook/react'
import Home from '@/pages/index'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'
import StoryProvider from '@/provider/story.provider'

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
    <StoryProvider>
      <div style={{ backgroundColor: '#100e19' }}>
        <Home {...props} />
      </div>
    </StoryProvider>
  ),
  args: {
    firstCarouselFilms: transformFilms(filmsListData),
    secondCarouselFilms: transformFilms(filmsListData),
  },
}

export default meta
