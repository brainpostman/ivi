import FilterBlock from '@/components/FilterBlock/FilterBlock'
import { Meta } from '@storybook/react'
import style from './FilterBlock.stories.module.scss'
import { filterActorData } from '@/data/filterActor.data'
import { filterGenreListData } from '@/data/filterGenre.data'
import { filterCountryListData } from '@/data/filterCountry.data'
import { filterDirectorData } from '@/data/filterDirectordata'

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
  argTypes: {},
}

export const Primary = () => (
  <div className={style.wrapper}>
    <FilterBlock
      actors={filterActorData}
      genres={filterGenreListData}
      countries={filterCountryListData}
      directors={filterDirectorData}
    />
  </div>
)
export default meta
