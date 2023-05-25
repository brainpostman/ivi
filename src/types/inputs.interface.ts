import {
  ChangeEvent,
  DetailedHTMLProps,
  Ref,
  TextareaHTMLAttributes,
} from 'react'

export interface ICustomTextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  charHideBtn?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

export interface ICommentFormProps {
  textareaValue: string
  textareaOnChangeFn: (e: ChangeEvent<HTMLTextAreaElement>) => void
  textareaPlaceholder?: string
  sendButtonClickFn: () => void
  cancelButtonCallback?: () => void
}
