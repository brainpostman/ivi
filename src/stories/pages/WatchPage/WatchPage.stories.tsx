import { Meta, StoryObj } from '@storybook/react'
import WatchPage from '@/pages/watch/[id]'
import { filmsListData } from '@/data/films.data'
import {
  transformFilmById,
  transformFilms,
} from '@/api/transforms/films.transform'
import StoryProvider from '@/provider/story.provider'

type Story = StoryObj<typeof WatchPage>

const meta: Meta = {
  title: 'pages/WatchPage',
  parameters: {
    docs: {
      description: {
        component: 'Страница фильма',
      },
    },
  },
  component: WatchPage,
  argTypes: {
    film: { table: { disable: true } },
    films: { table: { disable: true } },
    reviewData: { table: { disable: true } },
  },
}

export const Primary: Story = {
  render: props => (
    <StoryProvider>
      <WatchPage {...props} />
    </StoryProvider>
  ),
  args: {
    film: transformFilmById(filmsListData[0]),
    films: transformFilms(filmsListData),
    reviewData: {
      reviewCount: 1,
      reviews: [
        {
          id: 1,
          user_id: 1,
          user_email: 'test@test.ru',
          text: 'Some text',
          parent: 2,
          film_id: 1,
          createdAt: '2023-05-24T12:09:26.037Z',
          name: 'test',
        },
      ],
    },
  },
}

export default meta
