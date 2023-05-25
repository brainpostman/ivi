import CommentForm from '@/components/UI/CommentForm/CommentForm'
import { ICommentFormProps } from '@/types/inputs.interface'
import { Meta, StoryObj } from '@storybook/react'
import { ChangeEvent, useState } from 'react'

type Story = StoryObj<typeof CommentForm>

const meta: Meta = {
  title: 'UI/CommentForm',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Форма для создания комментария',
      },
    },
  },
  component: CommentForm,
  argTypes: {
    cancelButtonCallback: { table: { disable: true } },
    sendButtonClickFn: { table: { disable: true } },
    textareaOnChangeFn: { table: { disable: true } },
    textareaValue: { table: { disable: true } },
    textareaPlaceholder: {
      name: 'placeholder',
      description: 'Надпись при отсутствии текста',
    },
  },
}

export const Primary = ({
  textareaValue,
  textareaPlaceholder,
}: ICommentFormProps) => {
  const emptyFunc = () => {}
  const [value, setValue] = useState(textareaValue)
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value)

  return (
    <div style={{ width: 600 }}>
      <CommentForm
        textareaValue={value}
        textareaPlaceholder={textareaPlaceholder}
        sendButtonClickFn={emptyFunc}
        textareaOnChangeFn={event => onChange(event)}
      />
    </div>
  )
}

Primary.args = {
  textareaValue: '',
  textareaPlaceholder: 'Комментарий',
}

export default meta
