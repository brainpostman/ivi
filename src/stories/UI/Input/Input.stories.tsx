import Input from '@/components/UI/Input/Input'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Input>

const meta: Meta = {
  title: 'UI/Input',
  parameters: {
    docs: {
      description: {
        component: 'Основное поле для ввода',
      },
    },
  },
  component: Input,
  argTypes: {
    type: {
      description: 'Тип значения',
      options: ['text', 'number'],
      control: 'select',
    },
    placeholder: {
      description: 'Текст при пустом поле',
    },
  },
}

export const Text: Story = {
  args: {
    placeholder: 'Текст при пустом поле',
    type: 'text',
  },
}

export const Number: Story = {
  args: {
    placeholder: '0',
    type: 'number',
  },
}

export default meta
