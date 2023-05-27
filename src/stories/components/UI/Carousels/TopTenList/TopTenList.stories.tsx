import { transformFilms } from '@/api/transforms/films.transform'
import TopTenList from '@/components/UI/Carousels/TopTenList/TopTenList'
import { filmsListData } from '@/data/films.data'
import { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Carousels/TopTenList',
  parameters: {
    docs: {
      description: {
        component: 'Карусель. Топ 10 за неделю',
      },
    },
  },
  component: TopTenList,
  argTypes: {},
}

export const Primary = () => {
  return (
    <div
      style={{ backgroundColor: '#000', width: '1350px', paddingLeft: '32px' }}
    >
      <TopTenList topTenFilms={transformFilms(filmsListData.slice(0, 10))} />
    </div>
  )
}

export default meta
