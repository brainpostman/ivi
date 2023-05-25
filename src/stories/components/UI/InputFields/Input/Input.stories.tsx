import Input from '@/components/UI/InputFields/Input/Input'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Input>

const meta: Meta = {
  title: 'UI/InputFields/Input',
  parameters: {
    docs: {
      description: {
        component: 'Основное поле для ввода',
      },
    },
  },
  component: Input,
  argTypes: {
    ref: { table: { disable: true } },
    charHideBtn: {
      description: 'Возможность скрывать текст',
    },
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
    charHideBtn: false,
  },
}

export const Number: Story = {
  args: {
    placeholder: '0',
    type: 'number',
    charHideBtn: false,
  },
}

export default meta
