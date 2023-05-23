import styles from './CommentForm.module.scss';
import SimpleButton from '../SimpleButton/SimpleButton';
import TextArea from '../TextArea/TextArea';
import { ChangeEvent } from 'react';

interface ICommentFormProps {
    textareaValue: string;
    textareaOnChangeFn: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    textareaPlaceholder?: string;
    sendButtonClickFn: () => void;
    cancelButtonCallback?: () => void;
}

const CommentForm = ({
    textareaValue,
    textareaOnChangeFn,
    textareaPlaceholder = '',
    sendButtonClickFn,
    cancelButtonCallback,
}: ICommentFormProps) => {
    return (
        <div className={styles.textarea_wrapper}>
            <TextArea
                value={textareaValue}
                onChange={(e) => {
                    textareaOnChangeFn(e);
                }}
                placeholder={textareaPlaceholder}
                className={styles.textarea}
            />
            <div className={styles.controls}>
                <SimpleButton className={styles.button} onClick={sendButtonClickFn}>
                    Отправить
                </SimpleButton>
                {cancelButtonCallback && (
                    <SimpleButton className={styles.button} onClick={cancelButtonCallback}>
                        Отменить
                    </SimpleButton>
                )}
            </div>
        </div>
    );
};

export default CommentForm;
