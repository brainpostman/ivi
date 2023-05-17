import MovieCard from '@/components/MovieCard/MovieCard'
import { Meta } from '@storybook/react'
import style from './MovieCard.stories.module.scss'
import { IMovie } from '@/types/films.api.interface'

const data = {
  id: 1,
  mainImg:
    'https://thumbs.dfs.ivi.ru/storage28/contents/0/c/ee49b7f16535f8ca2467904800da81.jpg/234x360//?q=85',
  name: 'Шоу Патрика Стара',
  year: '2021',
  countries: 'США',
  genres: 'Сериалы',
  time: '1 сезон',
  countScore: 5.3,
}

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

export const Primary = ({ ...props }: Omit<IMovie, 'id'>) => {
  return (
    <div className={style.wrapper}>
      <MovieCard
        movie={{
          id: data.id,
          ...props,
        }}
      />
    </div>
  )
}

Primary.args = data

export default meta
