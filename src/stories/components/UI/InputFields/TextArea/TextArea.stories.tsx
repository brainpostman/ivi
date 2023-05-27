import TextArea from '@/components/UI/InputFields/TextArea/TextArea'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof TextArea>

const meta: Meta = {
  title: 'UI/InputFields/TextArea',
  parameters: {
    docs: {
      description: {
        component: 'Большое поле для ввода текста',
      },
    },
  },
  component: TextArea,
  argTypes: {
    ref: { table: { disable: true } },
    charHideBtn: { table: { disable: true } },
    placeholder: {
      description: 'Текст при пустом поле',
    },
  },
}

export const Text: Story = {
  render: props => (
    <div style={{ width: 400 }}>
      <TextArea {...props} />
    </div>
  ),
  args: {
    placeholder: 'Текст при пустом поле',
  },
}

export default meta
