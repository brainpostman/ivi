import TopTenList from '@/components/TopTenList/TopTenList'
import { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'Carousels/TopTenList',
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
      <TopTenList />
    </div>
  )
}

export default meta
