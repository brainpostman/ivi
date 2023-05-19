import { Meta, StoryObj } from '@storybook/react'
import FilmPage from '@/pages/watch/[id]'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'
import { staffData } from '@/data/staff.data'

type Story = StoryObj<typeof FilmPage>

const meta: Meta = {
  title: 'pages/FilmPage',
  parameters: {
    docs: {
      description: {
        component: 'Страница фильма',
      },
    },
  },
  component: FilmPage,
  argTypes: {},
}

export const Primary: Story = {
  args: {
    film: { ...transformFilms(filmsListData[0]), actors: [{}] },
  },
}

export default meta
