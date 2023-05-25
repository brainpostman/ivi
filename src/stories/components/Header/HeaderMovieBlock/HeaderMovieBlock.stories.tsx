import { transformFilms } from '@/api/transforms/films.transform'
import HeaderMovieBlock from '@/components/Header/HeaderHoverBlock/HeaderMovieBlock/HeaderMovieBlock'
import { filmsListData } from '@/data/films.data'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof HeaderMovieBlock>

const meta: Meta = {
  title: 'Header/HeaderMovieBlock',
  parameters: {
    docs: {
      description: {
        component: 'Блок во вкладке TV, в хедере',
      },
    },
  },
  component: HeaderMovieBlock,
}

export const Primary: Story = {
  render: props => (
    <div style={{ width: 'fit-content' }}>
      <HeaderMovieBlock {...props} />
    </div>
  ),
  args: {
    films: transformFilms(filmsListData),
  },
}

export default meta
