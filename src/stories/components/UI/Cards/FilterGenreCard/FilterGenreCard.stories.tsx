import FilterGenreCard from '@/components/UI/Cards/FilterGenreCard/FilterGenreCard'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof FilterGenreCard>

const meta: Meta = {
  title: 'UI/Cards/FilterGenreCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Карточка жанра',
      },
    },
  },
  component: FilterGenreCard,
  argTypes: {
    onClick: { table: { disable: true } },
    title: {
      description: 'Название жанра',
    },
  },
}

export const Primary: Story = {
  args: {
    onClick: () => {},
    title: 'Детектив',
  },
}

export default meta
