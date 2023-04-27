import FilterSlider from '@/components/FilterBlock/FilterSlider/FilterSlider'
import { IFilterSliderProps } from '@/types/filterBlock.interface'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof FilterSlider>

const meta: Meta = {
  title: 'FilterBlock/FilterSlider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Слайдер. Находится на странице /movies',
      },
    },
  },
  component: FilterSlider,
  argTypes: {
    maxValue: {
      description: 'Максимальное значение',
    },
    minValue: {
      description: 'Минимальное значение',
    },
    query: {
      description: 'Название параметра',
    },
    title: {
      description: 'Заголовок',
    },
  },
}

export const Primary = {
  render: ({ ...props }: IFilterSliderProps) => (
    <div style={{ width: 250 }}>
      <FilterSlider {...props} />
    </div>
  ),
  args: {
    maxValue: 200,
    minValue: 0,
    query: 'rating',
    title: 'Рейтинг',
  },
}

export default meta
