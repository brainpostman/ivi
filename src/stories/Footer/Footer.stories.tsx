import Footer from '@/components/Footer/Footer'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Footer>

const meta: Meta = {
  title: 'Footer',
  parameters: {
    docs: {
      description: {
        component: 'Футер',
      },
    },
  },
  component: Footer,
}

export const Primary: Story = {}

export default meta
