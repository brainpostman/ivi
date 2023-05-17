import SimpleButton from '@/components/UI/SimpleButton/SimpleButton'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof SimpleButton>

const meta: Meta = {
  title: 'UI/SimpleButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Простая кнопка',
      },
    },
  },
  component: SimpleButton,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
    },
  },
}

export const Primary: Story = {
  args: {
    children: 'Оценить',
  },
}

export default meta
