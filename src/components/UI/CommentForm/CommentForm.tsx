import styles from './CommentForm.module.scss';
import SimpleButton from '../SimpleButton/SimpleButton';
import TextArea from '../TextArea/TextArea';
import { CSSProperties, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';

interface ICommentFormProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    onClickSubmit: () => void;
    cancelButtonCallback?: () => void;
    className?: string;
    style?: CSSProperties | undefined;
}

const CommentForm = ({
    value: textareaValue,
    onChange: textareaOnChangeFn,
    placeholder: textareaPlaceholder = '',
    onClickSubmit: sendButtonClickFn,
    cancelButtonCallback,
    className: propsClassName = '',
    style: propsStyle,
}: ICommentFormProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'comment-form' });
    return (
        <div className={styles.textarea_wrapper}>
            <TextArea
                value={textareaValue}
                onChange={(e) => {
                    textareaOnChangeFn(e);
                }}
                placeholder={textareaPlaceholder}
                className={`${styles.textarea} ${propsClassName}`}
                style={propsStyle}
            />
            <div className={styles.controls}>
                <SimpleButton className={styles.button} onClick={sendButtonClickFn}>
                    {t('send')}
                </SimpleButton>
                {cancelButtonCallback && (
                    <SimpleButton className={styles.button} onClick={cancelButtonCallback}>
                        {t('cancel')}
                    </SimpleButton>
                )}
            </div>
        </div>
    );
};

export default CommentForm;
