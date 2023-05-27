import CodeLink from '@/components/Storybook/CodeLink/CodeLink'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof CodeLink>

const meta: Meta = {
  title: 'Storybook/CodeLink',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Ссылка на репозиторий с кодом',
      },
    },
  },
  component: CodeLink,
  argTypes: {
    href: {
      name: 'url',
      description: 'Ссылка на репозиторий с кодом',
    },
  },
}

export const Primary: Story = {
  args: {
    href: 'http://github.com',
  },
}

export default meta
