import ExpandInfo from '@/components/ExpandInfo/ExpandInfo'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof ExpandInfo>

const meta: Meta = {
  title: 'ExpandInfo',
  parameters: {
    docs: {
      description: {
        component: 'Компонент, в котором можно развернуть/свернуть текст',
      },
    },
  },
  tags: ['autodocs'],
  component: ExpandInfo,
  argTypes: {
    children: {
      name: 'text',
      description: 'Текст для свёртки',
      control: {
        type: 'text',
        outerHeight: 100,
      },
    },
    title: {
      description: 'Заголовок',
    },
    visibleText: {
      description: 'Видимый текст',
    },
    lineClamp: {
      description: 'Ограничение по строкам для видимого текста',
    },
    width: {
      control: 'text',
      description:
        'Ширина блока текста. Можно указать процентах: 20% или в пикселях',
    },
  },
}

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione nesciunt illum quaerat molestiae commodi facere perspiciatis voluptatibus aut unde, numquam quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione nesciunt illum quaerat molestiae commodi facere perspiciatis voluptatibus aut unde, numquam quod.',
    title: 'Lorem ipsum dolor sit amet consectetur',
    visibleText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione',
    lineClamp: 2,
    width: '75%',
  },
}

export default meta
