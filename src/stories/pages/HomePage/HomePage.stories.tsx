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
  argTypes: {},
}

export const Primary: Story = {
  render: props => (
    <SessionProvider>
      <Provider store={store}>
        <div style={{ backgroundColor: '#100e19', width: 1400 }}>
          <Home {...props} />
        </div>
      </Provider>
    </SessionProvider>
  ),
  args: {
    firstCarouselFilms: [],
    secondCarouselFilms: [],
  },
}

export default meta
