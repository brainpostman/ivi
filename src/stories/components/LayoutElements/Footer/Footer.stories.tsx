import Footer from '@/components/LayoutElements/Footer/Footer'
import StoryProvider from '@/provider/story.provider'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Footer>

const meta: Meta = {
  title: 'LayoutElements/Footer',
  parameters: {
    docs: {
      description: {
        component: 'Футер',
      },
    },
  },
  component: Footer,
}

export const Primary: Story = {
  render: () => (
    <StoryProvider>
      <Footer />
    </StoryProvider>
  ),
}

export default meta
