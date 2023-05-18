import { Meta, StoryObj } from '@storybook/react'
import Home from '@/pages/index'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'

type Story = StoryObj<typeof Home>

const meta: Meta = {
  title: 'pages/Home',
  parameters: {
    docs: {
      description: {
        component: 'Главная страница',
      },
    },
  },
  component: Home,
  argTypes: {
    firstCarouselFilms: { table: { disable: true } },
    secondCarouselFilms: { table: { disable: true } },
  },
}

export const Primary: Story = {
  render: props => (
    <SessionProvider>
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    </SessionProvider>
  ),
  args: {
    firstCarouselFilms: [],
    secondCarouselFilms: [],
  },
}

export default meta
