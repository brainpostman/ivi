import HeaderIconButton from '@/components/UI/Buttons/HeaderIconButton/HeaderIconButton'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof HeaderIconButton>

const meta: Meta = {
  title: 'UI/Buttons/HeaderIconButton',
  parameters: {
    docs: {
      description: {
        component: 'Кнопка с иконкой для шапки сайта',
      },
    },
  },
  component: HeaderIconButton,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
    },
    icon: {
      description: 'Вариант иконки',
      control: 'select',
    },
    customIcon: {
      table: {
        disable: true,
      },
    },
  },
}

export const Search: Story = {
  args: {
    children: 'Поиск',
    icon: 'search',
  },
}

export const Notification: Story = {
  args: {
    icon: 'notification',
  },
}

export default meta
