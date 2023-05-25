import { Meta } from '@storybook/react'
import StaffPage from '@/pages/person/[id]'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'
import { IStaff, IStaffType } from '@/types/api/staffs.api.interface'
import { IMovie } from '@/types/api/films.api.interface'
import StoryProvider from '@/provider/story.provider'

const meta: Meta = {
  title: 'pages/StaffPage',
  parameters: {
    docs: {
      description: {
        component: 'Страница участника',
      },
    },
  },
  component: StaffPage,
  argTypes: {
    totalCount: { table: { disable: true } },
    films: { table: { disable: true } },
    name: {
      description: 'Имя участника',
    },
    type: {
      description: 'Тип участинка',
      options: [
        'director',
        'artist',
        'actor',
        'scenario',
        'montage',
        'operator',
        'producer',
        'compositor',
      ],
      control: 'select',
    },
    biography: {
      description: 'Биография',
    },
  },
}

interface IPrimray {
  name: string
  type: IStaffType
  biography: string
  films: IMovie[]
  totalCount: number
}

export const Primary = ({
  name,
  type,
  biography,
  films,
  totalCount,
}: IPrimray) => {
  const staff: IStaff = {
    id: 1,
    name,
    type,
    biography,
    name_en: 'Staff 1',
  }

  return (
    <StoryProvider>
      <StaffPage staff={staff} films={films} totalCount={totalCount} />
    </StoryProvider>
  )
}

Primary.args = {
  name: 'Участник 1',
  type: 'actor',
  biography: 'Биография',
  films: transformFilms(filmsListData),
  totalCount: filmsListData.length,
}

export default meta
