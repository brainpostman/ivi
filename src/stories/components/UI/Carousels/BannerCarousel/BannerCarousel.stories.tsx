import BannerCarousel from '@/components/UI/Carousels/BannerCarousel/BannerCarousel'
import { Meta } from '@storybook/react'
import { useTranslation } from 'react-i18next'

const meta: Meta = {
  title: 'UI/Carousels/BannerCarousel',
  parameters: {
    docs: {
      description: {
        component: 'Баннер-карусель на главной странице',
      },
    },
  },
  component: BannerCarousel,
  argTypes: {
    children: {
      name: 'label',
      description: 'Текст кнопки',
    },
    backgroundColor: {
      name: 'color',
      description: 'Цвет кнопки',
      control: 'color',
    },
  },
}

export const Primary = () => {
  const { t } = useTranslation('home')
  return (
    <BannerCarousel items={t('banner-carousel', { returnObjects: true })} />
  )
}

export default meta
