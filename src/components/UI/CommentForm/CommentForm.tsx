import styles from './CommentForm.module.scss'
import SimpleButton from '../Buttons/SimpleButton/SimpleButton'
import TextArea from '../InputFields/TextArea/TextArea'
import { ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'

interface ICommentFormProps {
  textareaValue: string
  textareaOnChangeFn: (e: ChangeEvent<HTMLTextAreaElement>) => void
  textareaPlaceholder?: string
  sendButtonClickFn: () => void
  cancelButtonCallback?: () => void
}

const CommentForm = ({
  textareaValue,
  textareaOnChangeFn,
  textareaPlaceholder = '',
  sendButtonClickFn,
  cancelButtonCallback,
}: ICommentFormProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'comment-form' })
  return (
    <div className={styles.textarea_wrapper}>
      <TextArea
        value={textareaValue}
        onChange={e => {
          textareaOnChangeFn(e)
        }}
        placeholder={textareaPlaceholder}
        className={styles.textarea}
      />
      <div className={styles.controls}>
        <SimpleButton className={styles.button} onClick={sendButtonClickFn}>
          {t('send')}
        </SimpleButton>
        {cancelButtonCallback && (
          <SimpleButton
            className={styles.button}
            onClick={cancelButtonCallback}
          >
            {t('cancel')}
          </SimpleButton>
        )}
      </div>
    </div>
  )
}

export default CommentForm
