import { transformFilms } from '@/api/transforms/films.transform'
import { filmsListData } from '@/data/films.data'
import { Meta } from '@storybook/react'
import { IFilmsgGetResponse } from '@/types/api/films.api.interface'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'
import MiniCarousel from '@/components/UI/Carousels/MiniCarousel/MiniCarousel'

type IProps = Omit<
  ICustomCarouselProps,
  'elementsMove' | 'elementsView' | 'children'
> & {
  elementsMove?: number
  elementsView?: number
  films: IFilmsgGetResponse[]
}

const meta: Meta = {
  title: 'UI/Carousels/MiniCarousel',
  parameters: {
    docs: {
      description: {
        component: 'Мини-карусель фильмов',
      },
    },
  },
  tags: ['autodocs'],
  component: MiniCarousel,
  argTypes: {
    films: { table: { disable: true } },
    classNameWrapper: { table: { disable: true } },
    classNameList: { table: { disable: true } },
    // TODO: сделать активными
    breakpoints: { table: { disable: true } },
    additElem: { table: { disable: true } },
    lines: { table: { disable: true } },
    className: { table: { disable: true } },
    width: { table: { disable: true } },
    arrowSize: { table: { disable: true } },
    autoplay: {
      description: 'Автопрокрутка',
    },
    space: { table: { disable: true } },
    padding: {
      description: 'Внутренний отступ карусели',
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
  },
}

export const Primary = ({ films: filmsIncoming, ...props }: IProps) => {
  const films = transformFilms(filmsIncoming)
  return <MiniCarousel films={films} {...props} />
}

Primary.args = {
  films: filmsListData,
  elementsMove: 1,
  elementsView: 2,
  arrowSize: 0,
  space: [8, 8],
  speed: 1000,
  autoplay: true,
  padding: 0,
  width: 'fit',
}

export default meta
