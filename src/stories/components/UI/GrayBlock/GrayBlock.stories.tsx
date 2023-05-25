import GrayBlock from '@/components/UI/GrayBlock/GrayBlock'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof GrayBlock>

const meta: Meta = {
  title: 'UI/GrayBlock',
  parameters: {
    docs: {
      description: {
        component: 'Серый блок. Используется в карусели MovieCarousel',
      },
    },
  },
  tags: ['autodocs'],
  component: GrayBlock,
  argTypes: {
    children: {
      name: 'text',
      description: 'Текст блока',
    },
  },
}

export const Primary: Story = {
  args: {
    children: 'Показать все',
  },
}

export default meta
