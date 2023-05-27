import FilterBlock from '@/components/FilterBlock/FilterBlock'
import { Meta } from '@storybook/react'
import style from './FilterBlock.stories.module.scss'
import { filterActorData } from '@/data/filterActor.data'
import { filterGenreListData } from '@/data/filterGenre.data'
import { filterCountryListData } from '@/data/filterCountry.data'
import { filterDirectorData } from '@/data/filterDirector.data'

const meta: Meta = {
  title: 'FilterBlock',
  parameters: {
    docs: {
      description: {
        component:
          'Фильтры не будут работать, т.к. storybook не даёт изменить URL',
      },
    },
  },
  component: FilterBlock,
  argTypes: {
    minYear: {
      description: 'Минимальный год выпуска',
    },
    maxYear: {
      description: 'Максимальный год выпуска',
    },
    minCountScore: {
      description: 'Минимальное количество оценок',
    },
    maxCountScore: {
      description: 'Максимальное количество оценок',
    },
  },
}

interface IProps {
  maxCountScore: number
  minCountScore: number
  maxYear: number
  minYear: number
  maxRating: number
}

export const Primary = (props: IProps) => (
  <div className={style.wrapper}>
    <FilterBlock
      actors={filterActorData}
      genres={filterGenreListData}
      countries={filterCountryListData}
      directors={filterDirectorData}
      {...props}
    />
  </div>
)

Primary.args = {
  minYear: 1996,
  maxYear: 2022,
  maxRating: 10,
  minCountScore: 10,
  maxCountScore: 1000,
}

export default meta
