import { transformFilms } from '@/api/transforms/films.transform'
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import MovieCard from '@/components/MovieCard/MovieCard'
import ViewAllBlock from '@/components/ViewAllBlock/ViewAllBlock'
import { tmpFilms } from '@/data/films.data'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'
import { Meta } from '@storybook/react'

const breakpoints = [
  { point: 1272, view: 6 },
  { point: 1096, view: 5 },
  { point: 920, view: 4 },
  { point: 744, view: 3 },
  { point: 599, view: 4 },
  { point: 512, view: 3 },
  { point: 392, view: 2 },
]

const meta: Meta = {
  title: 'Carousels/MovieCarousel',
  parameters: {
    docs: {
      description: {
        component: 'Карусель фильмов',
      },
    },
  },
  component: CustomCarousel,
  argTypes: {
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

export const Primary = ({
  space: spaceIncoming,
  additElem: additElemIncoming,
  viewMoreBlock = true,
  ...props
}: Omit<ICustomCarouselProps, 'space'> & {
  space: number
  viewMoreBlock?: boolean
}) => {
  const space = [spaceIncoming, spaceIncoming]
  const additElem = viewMoreBlock ? additElemIncoming : <></>
  return (
    <div
      style={{
        backgroundColor: '#000',
        width: '1300px',
        paddingLeft: '32px',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
    >
      <CustomCarousel space={space} additElem={additElem} {...props}>
        {tmpFilms
          .map(movie => transformFilms(movie))
          .map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </CustomCarousel>
    </div>
  )
}

Primary.args = {
  title: 'Карусель',
  href: '/',
  additElem: <ViewAllBlock />,
  elementsMove: 5,
  elementsView: 7,
  space: 24,
  arrowSize: 24,
  breakpoints,
  padding: 6,
  speed: 400,
  width: 'fit',
  viewMoreBlock: true,
}

export default meta
