import { Meta, StoryObj } from '@storybook/react'
import TopTenListCard from '@/components/UI/Cards/TopTenListCard/TopTenListCard'
import { topTenListImgNumbers } from '@/data/topTenList.data'

type Story = StoryObj<typeof TopTenListCard>

const meta: Meta = {
  title: 'UI/Cards/TopTenListCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Карточка фильма ТОП-10',
      },
    },
  },
  component: TopTenListCard,
  argTypes: {
    img: {
      description: 'Ссылка на изображение',
    },
    index: {
      description: 'Номер картинки',
      control: {
        type: 'number',
        min: 0,
        max: 9,
      },
    },
  },
}

export const Primary: Story = {
  args: {
    index: 0,
  },
}

export default meta
