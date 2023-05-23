import styles from './CommentForm.module.scss';
import SimpleButton from '../SimpleButton/SimpleButton';
import TextArea from '../TextArea/TextArea';
import { ChangeEvent } from 'react';

interface ICommentFormProps {
    textareaValue: string;
    textareaOnChangeFn: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    textareaPlaceholder?: string;
    sendButtonClickFn: () => void;
}

const CommentForm = ({
    textareaValue,
    textareaOnChangeFn,
    textareaPlaceholder = '',
    sendButtonClickFn,
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
            <SimpleButton className={styles.sendReview} onClick={sendButtonClickFn}>
                Отправить
            </SimpleButton>
        </div>
    );
};

export default CommentForm;
