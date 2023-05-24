import { Meta, StoryObj } from '@storybook/react'
import FilterSliderModif from './FilterSliderModif'

type Story = StoryObj<typeof FilterSliderModif>

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
  component: FilterSliderModif,
  argTypes: {
    range: { table: { disable: true } },
    typeSlider: {
      description: 'Одиночный или парный ползунок',
      options: ['single', 'paired'],
      control: 'select',
    },
    maxValue: {
      name: 'max',
      description: 'Максимальное значение',
    },
    minValue: {
      name: 'min',
      description: 'Минимальное значение',
    },
    querySingle: {
      name: 'query',
      description: 'Название параметра',
      if: {
        arg: 'typeSlider',
        eq: 'single',
      },
    },
    queryMin: {
      description: 'Название параметра для минимального значения',
      if: {
        arg: 'typeSlider',
        eq: 'paired',
      },
    },
    queryMax: {
      description: 'Название параметра для максимального значения',
      if: {
        arg: 'typeSlider',
        eq: 'paired',
      },
    },
    title: {
      description: 'Заголовок',
    },
  },
}

export const Paired: Story = {
  args: {
    minRange: 0,
    maxRange: 200,
    queryPaired: {
      min: 'minRating',
      max: 'maxRating',
    },
    title: 'Рейтинг',
    typeSlider: 'paired',
  },
}

export const Single: Story = {
  args: {
    minRange: 0,
    maxRange: 200,
    querySingle: 'rating',
    title: 'Рейтинг',
    typeSlider: 'single',
  },
}

export default meta
