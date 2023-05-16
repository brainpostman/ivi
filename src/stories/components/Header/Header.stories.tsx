import Header from '@/components/Header/Header'
import { store } from '@/store'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

type Story = StoryObj<typeof Header>

const meta: Meta = {
  title: 'Header',
  parameters: {
    docs: {
      description: {
        component: 'Шапка сайта',
      },
    },
  },
  component: Header,
}

export const Primary: Story = {
  render: () => (
    <Provider store={store}>
      <div style={{ width: 1240 }}>
        <Header />
      </div>
    </Provider>
  ),
}

export default meta
