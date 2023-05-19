import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import StaffPage from '@/pages/person/[id]'
import { staffData } from '@/data/staff.data'
import { filmsListData } from '@/data/films.data'
import { transformFilms } from '@/api/transforms/films.transform'
import { IStaff, IStaffType } from '@/types/staffs.interface'
import { IMovie } from '@/types/films.api.interface'

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
      options: ['actor', 'director'],
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
    <SessionProvider>
      <Provider store={store}>
        <StaffPage staff={staff} films={films} totalCount={totalCount} />
      </Provider>
    </SessionProvider>
  )
}

Primary.args = {
  name: 'Участник 1',
  type: 'actor',
  biography: 'Биография',
  films: filmsListData.map(film => transformFilms(film)),
  totalCount: filmsListData.length,
}

export default meta
