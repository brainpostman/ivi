import MovieCard from '@/components/MovieCard/MovieCard'
import { IMovieCard } from '@/types/movieCard.interface'
import { Meta } from '@storybook/react'
import style from './MovieCard.stories.module.scss'

const data = {
  id: 1,
  img: 'https://thumbs.dfs.ivi.ru/storage28/contents/0/c/ee49b7f16535f8ca2467904800da81.jpg/234x360//?q=85',
  title: 'Шоу Патрика Стара',
  isFree: false,
  rating: 7.4,
  bestIndicator: 'актёры',
  date: '2021',
  country: 'США',
  genre: 'Сериалы',
  duration: '1 сезон',
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
    img: {
      description: 'Ссылка на изображение',
    },
    title: {
      description: 'Название фильма',
    },
    isFree: {
      description: 'Бесплатный / платный фильм',
    },
    rating: {
      description: 'Рейтинг Иви',
      control: {
        step: 0.1,
      },
    },
    bestIndicator: {
      description: 'Лучший показатель',
    },
    date: {
      description: 'Годы выпуска',
    },
    country: {
      description: 'Страна',
    },
    genre: {
      description: 'Жанр',
    },
    duration: {
      description:
        'В случае полнометражки - длительность, в случае сериала - кол-во сезонов / серий',
    },
  },
}

export const Primary = ({ ...props }: Omit<IMovieCard, 'id'>) => {
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
