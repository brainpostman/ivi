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
      if: {
        arg: 'type',
        eq: 'password',
      },
    },
    type: {
      description: 'Тип значения',
      options: ['text', 'number', 'password'],
      control: 'select',
    },
    placeholder: {
      description: 'Текст при пустом поле',
    },
  },
}

export const Text: Story = {
  render: props => (
    <div style={{ width: 400 }}>
      <Input {...props} />
    </div>
  ),
  args: {
    placeholder: 'Текст при пустом поле',
    type: 'text',
    charHideBtn: false,
  },
}

export const Number: Story = {
  render: props => (
    <div style={{ width: 100 }}>
      <Input {...props} />
    </div>
  ),
  args: {
    placeholder: '0',
    type: 'number',
    charHideBtn: false,
  },
}

export const Password: Story = {
  render: props => (
    <div style={{ width: 400 }}>
      <Input {...props} />
    </div>
  ),
  args: {
    placeholder: 'Пароль',
    type: 'password',
    charHideBtn: true,
  },
}

export default meta
