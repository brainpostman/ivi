import { transformFilms } from '@/api/transforms/films.transform'
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel'
import { filmsListData } from '@/data/films.data'
import { Meta } from '@storybook/react'
import { IFilmsgGetResponse } from '@/types/api/films.api.interface'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'

type IProps = Omit<
  ICustomCarouselProps,
  'elementsMove' | 'elementsView' | 'children'
> & {
  elementsMove?: number
  elementsView?: number
  films: IFilmsgGetResponse[]
}

const meta: Meta = {
  title: 'Carousels/MovieCarousel',
  parameters: {
    docs: {
      description: {
        component: 'Карусель фильмов',
      },
    },
  },
  component: MovieCarousel,
  argTypes: {
    films: { table: { disable: true } },
    classNameWrapper: { table: { disable: true } },
    classNameList: { table: { disable: true } },
    // TODO: сделать активными
    breakpoints: { table: { disable: true } },
    additElem: { table: { disable: true } },
    space: {
      description: 'Отступ между элементами',
      control: 'number',
    },
    title: {
      description: 'Заголовок карусели',
    },
    href: {
      name: 'url',
      description: 'Ссылка при клике на заголовок',
      control: 'text',
      if: {
        arg: 'title',
        truthy: true,
      },
    },
    arrowSize: {
      description: 'Размер стрелок',
    },
    padding: {
      description: 'Внутренний отступ карусели',
    },
    width: {
      description:
        'Ширина карусели. full - 1225px; fit - по количеству видимых элементов; fit-shadow - добавляет тень + половину следующего элемента',
      control: 'select',
    },
    speed: {
      description: 'Скорость прокрутки (в мс)',
    },
    elementsView: {
      description: 'Число отображаемых элементов',
      if: {
        arg: 'width',
        neq: 'full',
      },
    },
    elementsMove: {
      description: 'Число элементов, на которое двигается карусель',
    },
    viewMoreBlock: {
      description: 'Добавляет блок "Посмотреть все"',
      control: 'boolean',
    },
  },
}

export const Primary = ({ films: filmsIncoming, ...props }: IProps) => {
  const films = transformFilms(filmsIncoming)
  return (
    <div
      style={{
        backgroundColor: '#000',
        width: '1300px',
        paddingLeft: '12px',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
    >
      <MovieCarousel films={films} {...props} />
    </div>
  )
}

Primary.args = {
  title: 'Название карусели',
  href: '/',
  films: filmsListData,
  elementsMove: 5,
  elementsView: 7,
  arrowSize: 24,
  space: [24, 24],
  speed: 400,
  padding: 6,
  viewMoreBlock: true,
  width: 'fit',
}

export default meta
