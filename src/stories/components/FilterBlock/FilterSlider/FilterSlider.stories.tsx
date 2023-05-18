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
    range: { table: { disable: true } },
    typeSlider: {
      description: 'Одиночный или парный ползунок',
      options: ['single', 'paired'],
      control: 'select',
    },
    maxValue: {
      description: 'Максимальное значение',
    },
    minValue: {
      description: 'Минимальное значение',
      if: { arg: 'typeSlider', eq: 'paired' },
    },
    query: {
      description: 'Название параметра',
    },
    title: {
      description: 'Заголовок',
    },
  },
}

export const Paired = {
  render: ({
    maxValue,
    minValue,
    range,
    typeSlider,
    ...props
  }: IFilterSliderProps & {
    minValue: number
    maxValue: number
    typeSlider: 'single' | 'paired'
  }) => {
    const currentRange =
      typeSlider === 'paired' ? { min: minValue, max: maxValue } : undefined

    const singleMaxValue = maxValue

    return (
      <div style={{ width: 250 }}>
        <FilterSlider
          maxValue={singleMaxValue}
          range={currentRange}
          {...props}
        />
      </div>
    )
  },
  args: {
    minValue: 0,
    maxValue: 200,
    query: 'rating',
    title: 'Рейтинг',
    typeSlider: 'paired',
  },
}

export const Single = {
  render: ({ range, ...props }: IFilterSliderProps) => {
    return (
      <div style={{ width: 250 }}>
        <FilterSlider {...props} />
      </div>
    )
  },
  args: {
    query: 'minCountScore',
    title: 'Оценки',
    maxValue: 100,
    typeSlider: 'single',
  },
}

export default meta
