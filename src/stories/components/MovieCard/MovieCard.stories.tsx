import MovieCard from '@/components/MovieCard/MovieCard'
import { Meta, StoryObj } from '@storybook/react'
import style from './MovieCard.stories.module.scss'
import { IMovie } from '@/types/films.api.interface'
import { tmpFilms } from '@/data/films.data'
import { FC } from 'react'
import { transformFilms } from '@/api/transforms/films.transform'

type Story = StoryObj<typeof MovieCard>

const meta: Meta = {
  title: 'MovieCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Карточка фильма',
      },
    },
  },
  component: MovieCard,
  argTypes: {
    movie: { table: { disable: true } },
    id: { table: { disable: true } },
    mainImg: {
      name: 'img',
      description: 'Ссылка на изображение',
    },
    name: {
      description: 'Название фильма',
    },
    year: {
      description: 'Год выпуска',
    },
    countries: {
      description: 'Страны',
    },
    genres: {
      description: 'Жанр',
    },
    time: {
      name: 'duration',
      description:
        'В случае полнометражки - длительность, в случае сериала - кол-во сезонов / серий',
    },
    countScore: {
      name: 'score',
      description: 'Оценка',
      control: {
        type: 'number',
        step: 0.1,
      },
    },
  },
}

export const Primary: Story = {
  render: ({ movie }) => (
    <div className={style.wrapper}>
      <MovieCard movie={movie} />
    </div>
  ),
  args: {
    movie: transformFilms(tmpFilms[0]),
  },
}

export default meta
