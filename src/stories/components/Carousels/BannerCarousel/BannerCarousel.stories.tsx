import BannerCarousel from '@/components/BannerCarousel/BannerCarousel'
import { Meta } from '@storybook/react'

const bannerCarouselItems = [
  {
    title: 'Brutal and courageous',
    subtitle: 'The best action movies of recent years',
    imgUrl: '/main_carousel/action.jpg',
    imgUrlMobile: '/main_carousel/action_mobile.jpg',
  },
  {
    title: 'To the smallest Russians',
    subtitle: 'Cartoons of domestic production',
    imgUrl: '/main_carousel/cartoons.jpg',
    imgUrlMobile: '/main_carousel/cartoons_mobile.jpg',
  },
  {
    title: 'Very funny',
    subtitle: 'Comedy films',
    imgUrl: '/main_carousel/comedies.jpg ',
    imgUrlMobile: '/main_carousel/comedies_mobile.jpg',
  },
  {
    title: 'Our pride',
    subtitle: 'Films of domestic production',
    imgUrl: '/main_carousel/russian.jpg',
    imgUrlMobile: '/main_carousel/russian_mobile.jpg',
  },
  {
    title: 'Window to the Future',
    subtitle: 'Selection of sci-fi films',
    imgUrl: '/main_carousel/scifi.jpg ',
    imgUrlMobile: '/main_carousel/scifi_mobile.jpg',
  },
  {
    title: 'An exciting spectacle',
    subtitle: 'A selection of the best thrillers of recent years',
    imgUrl: '/main_carousel/thrillers.jpg',
    imgUrlMobile: '/main_carousel/thrillers_mobile.jpg',
  },
]

const meta: Meta = {
  title: 'carousels/BannerCarousel',
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

export const Primary = () => <BannerCarousel items={bannerCarouselItems} />

export default meta
