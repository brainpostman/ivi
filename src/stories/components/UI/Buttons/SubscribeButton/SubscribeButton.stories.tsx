import SubscribeButton from '@/components/UI/Buttons/SubscribeButton/SubscribeButton'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof SubscribeButton>

const meta: Meta = {
  title: 'UI/Buttons/SubscribeButton',
  parameters: {
    docs: {
      description: {
        component: 'Кнопка для оплаты подписки. Находится в шапке сайта',
      },
    },
  },
  tags: ['autodocs'],
  component: SubscribeButton,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
    },
  },
}

export const Primary: Story = {
  args: {
    children: 'Оплатить подписку',
  },
}

export default meta
