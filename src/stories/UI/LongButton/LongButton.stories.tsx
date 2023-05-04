import LongButton from '@/components/UI/LongButton/LongButton'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof LongButton>

const meta: Meta = {
  title: 'UI/LongButton',
  parameters: {
    docs: {
      description: {
        component: 'Длинная кнопка на главной странице сайта',
      },
    },
  },
  component: LongButton,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
    },
    img: {
      description: 'Ссылка на изображение',
    },
    variant: {
      description: 'Вариант внешнего вида',
      control: 'select',
    },
  },
}

export const Primary: Story = {
  args: {
    children: 'Активировать сертификат',
    variant: 'primary',
    img: 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg',
  },
}

export const Secodnary: Story = {
  args: {
    children: '30 дней подписки за 1 ₽',
    variant: 'secondary',
    img: 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg',
  },
}

export default meta
