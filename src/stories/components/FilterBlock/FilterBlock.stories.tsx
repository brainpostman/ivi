import FilterBlock from '@/components/FilterBlock/FilterBlock'
import { Meta } from '@storybook/react'
import style from './FilterBlock.stories.module.scss'

const actors = [{ id: 1, name: 'actor1' }]
const genres = [{ id: 1, name: 'genre1' }]
const countries = [{ id: 1, name: 'country1' }]
const directors = [{ id: 1, name: 'director1' }]

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
      actors={actors}
      genres={genres}
      countries={countries}
      directors={directors}
    />
  </div>
)
export default meta
