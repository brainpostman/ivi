import ExpandBlock from '@/components/UI/ExpandBlock/ExpandBlock'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof ExpandBlock>

const meta: Meta = {
  title: 'UI/ExpandBlock',
  parameters: {
    docs: {
      description: {
        component:
          'Компонент, в котором можно развернуть/свернуть другой компонент',
      },
    },
  },
  tags: ['autodocs'],
  component: ExpandBlock,
  argTypes: {
    className: { table: { disable: true } },
    children: {
      name: 'text / component',
      description: 'Текст / комопнент для свёртки',
      control: {
        type: 'text',
        outerHeight: 100,
      },
    },
    title: {
      description: 'Заголовок',
    },
    visibleBlock: {
      control: 'text',
      description: 'Видимый текст / компонент',
    },
    lineClamp: {
      description: 'Ограничение по строкам для видимого текста',
    },
    width: {
      control: 'text',
      description:
        'Ширина блока текста. Можно указать процентах или в пикселях',
    },
    expandWord: {
      description: 'Текст кнопки "Развернуть"',
    },
  },
}

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione nesciunt illum quaerat molestiae commodi facere perspiciatis voluptatibus aut unde, numquam quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione nesciunt illum quaerat molestiae commodi facere perspiciatis voluptatibus aut unde, numquam quod.',
    title: 'Lorem ipsum dolor sit amet consectetur',
    visibleBlock:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi explicabo repellat qui voluptas laudantium quae voluptate ratione',
    lineClamp: 2,
    width: '75%',
    expandWord: 'Развернуть',
  },
}

export default meta
