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

export const OneMessage = ({
  messages: messagesIncoming,
  backgroundColor,
}: IErrorPopupProps) => {
  const messages = messagesIncoming.split(',')
  return <ErrorPopup messages={messages} style={{ backgroundColor }} />
}

OneMessage.args = {
  messages: 'Простая ошибка',
  backgroundColor: '#ff542e',
}

export const ListMessages = ({
  messages: messagesIncoming,
  backgroundColor,
}: IErrorPopupProps) => {
  const messages = messagesIncoming.split(',')
  return <ErrorPopup messages={messages} style={{ backgroundColor }} />
}

ListMessages.args = {
  messages: 'Простая ошибка #1, Простая ошибка #2, Простая ошибка #3',
  backgroundColor: '#ff542e',
}

export default meta
