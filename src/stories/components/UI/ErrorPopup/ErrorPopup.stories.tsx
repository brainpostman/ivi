import ErrorPopup from '@/components/UI/ErrorPopup/ErrorPopup'
import { Meta, StoryObj } from '@storybook/react'
import { CSSProperties } from 'react'

type Story = StoryObj<typeof ErrorPopup>

interface IErrorPopupProps {
  className?: string
  messages: string
  backgroundColor: CSSProperties['backgroundColor']
}

const meta: Meta = {
  title: 'UI/ErrorPopup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Уведомление об ошибке',
      },
    },
  },
  component: ErrorPopup,
  argTypes: {
    className: { table: { disable: true } },
    messages: {
      description: 'Список ошибок через запятую',
      control: 'text',
    },
    backgroundColor: {
      description: 'Цвет фона',
    },
  },
}

export const Primary = ({
  messages: messagesIncoming,
  backgroundColor,
}: IErrorPopupProps) => {
  const messages = messagesIncoming.split(',')
  return <ErrorPopup messages={messages} style={{ backgroundColor }} />
}

Primary.args = {
  messages: 'Простая ошибка',
  backgroundColor: '#ff542e',
}

export default meta
