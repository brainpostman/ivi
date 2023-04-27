import FilterListSmall from '@/components/FilterBlock/FilterListSmall/FilterListSmall'
import { IFilterListSmallProps } from '@/types/filterBlock.interface'
import { Meta } from '@storybook/react'
import FilterListSmallWrapper from './FilterListSmallWrapper'

const meta: Meta = {
  title: 'FilterBlock/FilterListSmall',
  parameters: {
    docs: {
      description: {
        component: 'Малый список фильтров. Находится на странице /movies',
      },
    },
  },
  component: FilterListSmall,
  argTypes: {
    filterData: { table: { disable: true } },
    list: { table: { disable: true } },
    query: { table: { disable: true } },
    unformattedStringedList: {
      name: 'filterElementsList',
      description: 'Список элементов фильтра. Пишем через запятую',
    },
  },
}

export const Year = ({
  ...props
}: IFilterListSmallProps & { unformattedStringedList: string }) => (
  <FilterListSmallWrapper {...props} />
)

Year.args = {
  unformattedStringedList:
    'Все годы, 2023 год, 2022 год, 2021 год, 2020 год, 2019 год, 2018 год, 2017 год, 2016 год, 2022-2023, 2021-2022, 2019-2020, 2010-2020, 2010-2015, 2000-2010, 1990-2000, 1980-1990, до 1980',
  query: 'year',
}

export default meta
