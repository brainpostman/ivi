import FilterBlock from '@/components/FilterBlock/FilterBlock'
import { Meta } from '@storybook/react'
import style from './FilterBlock.stories.module.scss'

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
    <FilterBlock />
  </div>
)
export default meta
