import FilterSuggest from '@/components/FilterBlock/FilterSuggest/FilterSuggest'
import {
  IFilterSuggestProps,
  IFilterTitle,
} from '@/types/filterBlock.interface'
import { Meta } from '@storybook/react'
import FilterSuggestWrapper from './FilterSuggestWrapper'

const meta: Meta = {
  title: 'FilterBlock/FilterSuggest',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '-----',
      },
    },
  },
  component: FilterSuggest,
  argTypes: {
    filterData: { table: { disable: true } },
    closeModal: { table: { disable: true } },
    suggestList: { table: { disable: true } },
    query: {
      description: 'Название параметра',
      options: ['director', 'actor'],
      control: 'select',
    },
    title: {
      description: 'Название фильтра',
      options: ['Режиссёр', 'Актёр'],
      control: 'select',
    },
    stringedSuggestList: {
      name: 'suggestList',
      description: 'Список автодополнений. Пишем через запятую',
    },
    placeholder: {
      description: 'Текст по умолчанию в поле для ввода',
    },
  },
}

export const Producer = ({
  ...props
}: Omit<IFilterSuggestProps, 'filterData' | 'closeModal' | 'suggestList'> & {
  title: IFilterTitle
  stringedSuggestList: string
}) => <FilterSuggestWrapper {...props} />

Producer.args = {
  query: 'producer',
  title: 'Режиссёр',
  stringedSuggestList:
    'продюсер 1,продюсер 2, продюсер 3, продюсер 4, продюсер 5, продюсер 6, продюсер 7, продюсер 8, продюсер 9, продюсер 10',
  placeholder: 'Введите имя режиссёра',
}

export const Actor = ({
  ...props
}: Omit<IFilterSuggestProps, 'filterData' | 'closeModal' | 'suggestList'> & {
  title: IFilterTitle
  stringedSuggestList: string
}) => <FilterSuggestWrapper {...props} />

Actor.args = {
  query: 'actor',
  title: 'Актёр',
  stringedSuggestList:
    'актёр 1,актёр 2, актёр 3, актёр 4, актёр 5, актёр 6, актёр 7, актёр 8, актёр 9, актёр 10',
  placeholder: 'Введите имя актёра',
}

export default meta
