import MovieCard from '@/components/UI/Cards/MovieCard/MovieCard'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'
import { filmsListData } from '@/data/films.data'
import { transformFilmById } from '@/api/transforms/films.transform'
import { IMovie } from '@/types/api/films.api.interface'

const filmData = transformFilmById(filmsListData[0])

type Story = StoryObj<typeof MovieCard>

const meta: Meta = {
  title: 'UI/Cards/MovieCard',
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

export const Primary = (
  {
    name: nameIncoming,
    name_en: nameEnIncoming,
    premiere: premiereIncoming,
    premiereRU: premiereRuIncoming,
    ...props
  }: IMovie,
  context: StoryContext<ReactRenderer>
) => {
  const { locale } = context.globals
  const name = (locale === 'en' ? nameEnIncoming : nameIncoming) as string
  const premiereRU =
    locale === 'en' && premiereIncoming ? premiereIncoming : premiereRuIncoming

  const movie = {
    ...props,
    name,
    premiereRU,
  }
  return (
    <div style={{ display: 'flex' }}>
      <MovieCard movie={movie} />
    </div>
  )
}

Primary.args = {
  id: 1,
  name: filmData?.name,
  name_en: filmData?.name_en,
  year: filmData?.year,
  countries: filmData?.countries,
  genres: filmData?.genres,
  tagline: filmData?.tagline,
  scoreAVG: filmData?.scoreAVG,
  countScore: filmData?.countScore,
  age: filmData?.age,
  description: filmData?.description,
  mainImg: filmData?.mainImg,
  time: filmData?.time,
  premiereRU: filmData?.premiereRU,
  premiere: filmData?.premiere,
}

export default meta
